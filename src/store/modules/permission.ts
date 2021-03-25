/**
 * 路由分为两大类：
 * 1.同步路由：所有人员都有权限
 * 2.异步路由：需要根据服务端返回的路由数据展示对应的菜单
 */

import { getCurrentName, getMenuList } from "@/utils/cookies";
import { asyncRoutes, constantRoutes } from "./../../router/index";

const state = {
  routes: constantRoutes, // 路由列表
  addRoutes: [], // 添加的动态路由
  defaultRoute: "",
  dynamicRoutes: [],
  menuRoutes: getMenuList() || [],
  hasBuilded: <Boolean>false,
};

const mutations = {
  SET_DEFAULTROUTES(state: any, val: string) {
    state.defaultRoute = val;
  },

  SET_ROUTES(state: any, routes: any[]) {
    state.routes = constantRoutes.concat(routes);
    state.dynamicRoutes = routes;
  },

  SET_MENU_ROUTES(state: any, routes: any[]) {
    state.menuRoutes = routes;
  },

  SET_HAS_BUILDED(val: Boolean) {
    state.hasBuilded = val;
  },
};

const actions = {
  saveMenuRoutes(context: any, routes: any[]) {
    context("SET_MENU_ROUTES", routes);
  },

  removeBuildFlag() {
    mutations.SET_HAS_BUILDED(false);
  },

  CurrentIsAuths(context: any, routers: any) {
    const currentMenuName = getCurrentName();
    let currentIsAuth = false;
    let status = false;
    if (currentMenuName) {
      for (let i = 0; i < routers.length; i++) {
        if (routers[i].name && routers[i].name === currentMenuName) {
          currentIsAuth = true;
          return currentIsAuth;
        } else if (
          !status &&
          routers[i].children &&
          (routers[i].children as any).length > 0
        ) {
          (routers[i].children as any).map((every: any) => {
            if (
              !status &&
              every.name &&
              every.name === currentMenuName &&
              (!every.meta.hidden || every.meta.isDetail)
            ) {
              if (every.meta.isDetail) {
                const isParentMenu = routers[i].children.find((e: any) => {
                  return e.name === every.meta.parentTitle;
                });
                status = true;
                currentIsAuth = isParentMenu
                  ? !isParentMenu.meta.hidden
                  : false;
                return currentIsAuth;
              } else {
                currentIsAuth = true;
                return currentIsAuth;
              }
            }
          });
        }
      }
      return currentIsAuth;
    } else {
      return currentIsAuth;
    }
  },

  GenerateRoutes(content: any, routes: any) {
    let accessedRoutes: any;
    let defaultRoute: any;
    const constRoutes = JSON.parse(JSON.stringify(constantRoutes));
    if (routes && routes.length > 0) {
      defaultRoute = constRoutes.find((r: any) => {
        return r.path === "/";
      });
      if (defaultRoute && routes[0].subMenus && routes[0].subMenus.length > 0) {
        // 修改默认跳转的url
        defaultRoute.redirect = routes[0].subMenus[0].path;
      } else {
        defaultRoute.redirect = routes[0].path;
      }
      content("SET_DEFAULTROUTES", defaultRoute.redirect);
    } else {
      content("SET_DEFAULTROUTES", "");
    }
    accessedRoutes = filterAsyncRoutes(asyncRoutes, routes);
    content("SET_ROUTES", accessedRoutes);
    content("SET_HAS_BUILDED", true);
    return defaultRoute;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

export const filterAsyncRoutes = (allRoutes: any[], routes: any) => {
  const res: any[] = [];
  allRoutes.forEach((route) => {
    const r = { ...route };
    const permissionObj = hasPermission(routes, r);
    if (permissionObj) {
      if (r.children && permissionObj.subMenus) {
        r.children = filterAsyncRoutes(r.children, permissionObj.subMenus);
      }
      res.push(r);
    }
  });
  return res;
};

const hasPermission = (routes: any, route: any) => {
  if (route.name) {
    // 用name判断菜单权限是否一致
    let routeObj = routes.find((r: any) => {
      return r.name === route.name;
    });
    if (!routeObj && route.meta.hidden) {
      // 对于隐藏的菜单与接口返回权限无关，加到route就好
      // 新加的菜单调试的时候用auth = false 直接显示
      routeObj = route;
    }
    return routeObj || false;
  } else if (route.children) {
    // 对于没有name的 去判断它的children[0].name是不是一样
    let val = route.children[0];
    if (val.meta.auth) {
      return route;
    } else {
      return routes.some((r: any) => r.name === val.name);
    }
  } else {
    return false;
  }
};
