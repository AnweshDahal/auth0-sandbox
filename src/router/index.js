// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  // ? Auth Routes
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "loginPage" */ "@/views/Auth/LoginPage.vue"),
  },
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "home" */ "@/views/HomePage/HomePage.vue"
          ),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
