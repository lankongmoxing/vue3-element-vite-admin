/**
 * main.ts中加载，
 */
import { getMenuListAPI } from "@/api/user";
import router from "@/router/index";
import store from "@/store/index";
import userVuex from "@/store/modules/user";
import {
  getEmptyRole,
  getMenuList,
  setEmptyRole,
  setMenuList
} from "@/utils/cookies";
import { ElMessage } from "element-plus";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// 白名单
const whiteList: string[] = ["/login", "/auth-redirect"];

// 路由跳转之前
router.beforeEach(async (to, from, next) => {
  // 开始读条
  NProgress.start();

  const token = userVuex.state.token;
  if (token) {
    if (to.path === "/login") {
      // 如果是登录页面, 重定向到默认页面
      next({ path: "/" });
      NProgress.done();
    } else {
      // 获取菜单列表
      await getMenuListAPI()
        .then((res: any) => {
          // 保存菜单到
          setMenuList(res.data);
          if (res.data.length > 0) {
            setEmptyRole("");
          } else {
            setEmptyRole("empty_role");
          }
        })
        .catch((error: any) => {
          console.log(error);
        });

      // 刷新重新获取数据 重新渲染权限菜单
      const menuList = getMenuList();
      // 是否拥有角色 角色菜单为空
      const emptyRole = getEmptyRole();
      // emptyRole 拥有角色 角色菜单可以设置为空
      // emptyRole 拥有角色 角色菜单可以设置为空
      if ((menuList && menuList.length > 0) || emptyRole) {
        // 有菜单 渲染权限菜单
        if (store.state.permission.hasBuilded) {
          next();
        } else {
          try {
            const defaultRouter: any = await store.dispatch(
              "permission/GenerateRoutes",
              menuList
            );

            store.state.permission.dynamicRoutes.map((v: any) => {
              router.addRoute(v);
            });

            // 默认跳转拥有权限菜单的第一个
            if (from.path === "/login") {
              next(`${defaultRouter ? defaultRouter.redirect : "/"}`);
            } else {
              next({ ...to, replace: true });
            }
          } catch (err) {
            // Remove token and redirect to login page
            store.dispatch("user/ResetToken");
            ElMessage.error(err || "Has Error");
            next(`/login?redirect=${to.path}`);
            NProgress.done();
          }
        }
      } else {
        // 无菜单 清除token 并且跳转登录
        store.dispatch("user/ResetToken");
        next(`/login?redirect=${to.path}`);
        NProgress.done();
        // 页面刷新无菜单时 跳转修改密码页面
        // next({ path: '/' })
        // NProgress.done()
      }
    }
    next();
  } else {
    // 没有 token
    if (whiteList.indexOf(to.path) !== -1) {
      // 如果将要跳转的地址是白名单中的，直接跳转
      next();
    } else {
      // 其他页面，跳转登录页面。带上重定向参数
      next(`/login?redirect=${to.path}`);

      // 结束读条
      NProgress.done();
    }
  }
});

// 路由跳转之后
router.afterEach((to: any) => {
  // 结束读条， 吐槽：vite 下，这个进度还需要吗
  NProgress.done();
});
