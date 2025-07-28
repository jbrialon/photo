import { createRouter, createWebHistory } from "vue-router";
import MobileDetect from "mobile-detect";

const md = new MobileDetect(window.navigator.userAgent);
const isMobile = md.phone() !== null;

const routes = [
  {
    path: "/",
    name: "Travels",
    component: () => import("../pages/Travels.vue"),
    props: true,
  },
  {
    path: "/octnov/",
    name: "Octnov",
    component: isMobile
      ? () => import("../pages/Disclaimer.vue")
      : () => import("../pages/Octnov.vue"),
    props: true,
  },
  {
    path: "/album/:name",
    name: "Travel",
    component: () => import("../pages/Travel.vue"),
    props: true,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../pages/About.vue"),
    props: true,
  },
  {
    path: "/404",
    name: "NotFound",
    component: () => import("../pages/404.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("../pages/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  linkExactActiveClass: "active",
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
  routes,
});

export default router;
