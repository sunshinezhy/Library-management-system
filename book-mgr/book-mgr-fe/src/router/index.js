import { createRouter, createWebHashHistory } from "vue-router";
import store from "@/store";
// import { character } from "@/service";
// import { list } from "../service/character";

const routes = [
  {
    path: "/auth",
    name: "Auth",
    component: () => import(/* webpackChunkName: "Auth" */ "../views/Auth/index.vue")
  },
  {
    path: "/",
    name: "BasicLayout",
    redirect: '/auth',
    component: () =>
      import(/* webpackChunkName: "BasicLayout" */ "../layout/BasicLayout/index.vue"),
    children: [
      {
        path: "books",
        name: "Books",
        component: () => import(/* webpackChunkName: "Books" */ "../views/Books/index.vue")
      },
      {
        path: "/books/:id",
        name: "BookDetail",
        component: () => import(/* webpackChunkName: "Users" */ "../views/BookDetail/index.vue")
      },
      {
        path: "user",
        name: "User",
        component: () => import(/* webpackChunkName: "User" */ "../views/Users/index.vue")
      },
      {
        path: "log",
        name: "Log",
        component: () => import(/* webpackChunkName: "Log" */ "../views/Log/index.vue")
      },
      {
        path: "reset/password",
        name: "ResetPassword",
        component: () =>
          import(/* webpackChunkName: "ResetPassword" */ "../views/ResetPassword/index.vue")
      },
      {
        path: "invite-code",
        name: "InviteCode",
        component: () =>
          import(/* webpackChunkName: "InviteCode" */ "../views/InviteCode/index.vue")
      },
      {
        path: "profile",
        name: "Profile",
        component: () => import(/* webpackChunkName: "Profile" */ "../views/Profile/index.vue")
      },
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import(/* webpackChunkName: "Dashboard" */ "../views/Dashboard/index.vue")
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  if (to.path === "/auth") {
    next();
    return;
  }

  const requArr = [];

  if (!store.state.characterInfo.length) {
    await store.dispatch("getCharacterInfo");
  }

  if (!store.state.userInfo.account) {
    await store.dispatch("getUserInfo");
  }

  await Promise.all(requArr);

  next();
});

export default router;
