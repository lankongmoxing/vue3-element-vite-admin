/**
 * 路由分为两大类：
 * 1.同步路由：所有人员都有权限
 * 2.异步路由：需要根据服务端返回的路由数据展示对应的菜单
 */

import { getMenuList } from "@/utils/cookies";
import { Mutation } from "vuex";
import { asyncRoutes, constantRoutes } from "./../../router/index";

interface stateType {
  routes: any[];
  addRoutes: [];
  defaultRoute: string;
  dynamicRoutes: any[];
  menuRoutes: any[];
  hasBuilded: Boolean;
}

const state: stateType = {
  routes: constantRoutes, // 路由列表
  addRoutes: [], // 添加的动态路由
  defaultRoute: "",
  dynamicRoutes: [], // 异步路由
  menuRoutes: getMenuList() || [],
  hasBuilded: <Boolean>false,
};

interface mutationsType {
  SET_DEFAULTROUTES: Mutation<stateType>;
  SET_ROUTES: Mutation<stateType>;
  SET_MENU_ROUTES: Mutation<stateType>;
  SET_HAS_BUILDED: Mutation<stateType>;
}

const mutations: mutationsType = {
  SET_DEFAULTROUTES(state: stateType, val: string): void {
    state.defaultRoute = val;
  },

  SET_ROUTES(state: stateType, routes: any[]): void {
    state.routes = constantRoutes.concat(routes);
    state.dynamicRoutes = routes;
  },

  SET_MENU_ROUTES(state: stateType, routes: any[]): void {
    state.menuRoutes = routes;
  },

  SET_HAS_BUILDED(state: stateType, val: Boolean): void {
    state.hasBuilded = val;
  },
};

interface contextType {
  commit: Function;
}

const actions = {
  // 保存菜单
  saveMenuRoutes(context: contextType, routes: any[]) {
    context.commit("SET_MENU_ROUTES", routes);
  },

  removeBuildFlag(context: contextType) {
    context.commit("SET_HAS_BUILDED", false);
  },

  GenerateRoutes(context: contextType, routes: any) {
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
      context.commit("SET_DEFAULTROUTES", defaultRoute.redirect);
    } else {
      context.commit("SET_DEFAULTROUTES", "");
    }
    accessedRoutes = filterAsyncRoutes(asyncRoutes, routes);

    context.commit("SET_ROUTES", accessedRoutes);
    context.commit("SET_HAS_BUILDED", true);
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
