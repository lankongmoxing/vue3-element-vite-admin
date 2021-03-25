import { createRouter, createWebHashHistory } from "vue-router";
import handleRouter from './modules/handle';
const layout = () => import("@/layout/index.vue");
// 在 Vue-router新版本中，需要使用createRouter来创建路由

/**
 * 同步路由
 */
const constantRoutes = [
  {
    path: "/",
    redirect: "/index",
    component: layout,
    meta: {
      title: "首页",
      icon: "home",
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "首页",
          icon: "home",
        },
      },
    ],
  },
  {
    path: '/login',
    component: () => import('../views/login/index.vue'),
    hidden: true,
    meta: {
      title: '登录',
      hidden: true
    },
  },
  {
    path: "/home2",
    redirect: "/home2/index",
    component: layout,
    meta: {
      title: "icons",
      icon: "home",
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/icons/index.vue"),
        meta: {
          title: "icons",
          icon: "svg",
        },
      },
    ],
  },
  handleRouter
];

const asyncRoutes: any = []
export { constantRoutes, asyncRoutes };

export default createRouter({
  // 指定路由的模式,此处使用的是hash模式
  history: createWebHashHistory(),
  // 路由地址
  routes: constantRoutes,
});
