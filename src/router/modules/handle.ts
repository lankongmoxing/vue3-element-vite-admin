const layout = () => import("@/layout/index.vue");

const handleRouter = {
  path: "/handle",
  component: layout,
  redirect: "/handle/index",
  name: "Handle",
  meta: {
    title: "功能",
    icon: "chat",
  },
  children: [
    {
      path: "index",
      component: () => import("@/views/handle/index.vue"),
      name: "Handle1",
      meta: { title: "功能11", hidden: false },
    },
    {
      path: "index2",
      component: () => import("@/views/handle/index2.vue"),
      name: "Handle2",
      meta: { title: "功能2", hidden: false },
    },
  ],
};

export default handleRouter;
