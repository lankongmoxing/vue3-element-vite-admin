/**
 * main.ts中加载
 */

import { getMenuListAPI } from "@/api/user";
import router from "@/router/index";
import store from "@/store/index";
import userVuex from "@/store/modules/user";
import { getMenuList, setMenuList } from "@/utils/cookies";
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
      next({ path: "/" }); // 如果是登录path, 重定向到默认页面
      NProgress.done(); // 结束读条
    } else {
      // 获取菜单列表
      await getMenuListAPI()
        .then((res: any) => {
          // 保存菜单到
          setMenuList(res.data);
        })
        .catch((error: any) => {
          console.log(error);
        });

      // 刷新重新获取数据 重新渲染权限菜单
      const menuList = getMenuList();

      if (menuList && menuList.length > 0) {
        // 有菜单 渲染权限菜单
        const hasBuilded = store.state.permission.hasBuilded;
        if (hasBuilded) {
          next();
        } else {
          try {
            const defaultRouter: any = await store.dispatch(
              "permission/GenerateRoutes",
              menuList
            );

            // vue-router4 移除了批量添加，故遍历单独添加
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
            // 清除token,跳转登录
            store.dispatch("user/ResetToken"); // 清除 token
            ElMessage.error(err || "Has Error"); // 提示错误
            next(`/login?redirect=${to.path}`); // 跳转登录
            NProgress.done(); // 结束读条
          }
        }
      } else {
        // 无菜单 清除token 并且跳转登录
        store.dispatch("user/ResetToken"); // 清除 token
        next(`/login?redirect=${to.path}`); // 跳转登录
        NProgress.done(); // 结束读条
      }
    }
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
