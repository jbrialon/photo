import { createRouter, createWebHistory } from "vue-router";
import MobileDetect from "mobile-detect";

import Disclaimer from "../pages/Disclaimer.vue";
import Octnov from "../pages/Octnov.vue";
import Travels from "../pages/Travels.vue";
import Travel from "../pages/Travel.vue";
import About from "../pages/About.vue";
import NotFound from "../pages/404.vue";

const md = new MobileDetect(window.navigator.userAgent);
const isMobile = md.phone() !== null;

const routes = [
  {
    path: "/",
    name: "Travels",
    component: Travels,
    props: true,
  },
  {
    path: "/octnov/",
    name: "Octnov",
    component: isMobile ? Disclaimer : Octnov,
    props: true,
  },
  {
    path: "/album/:name",
    name: "Travel",
    component: Travel,
    props: true,
  },
  {
    path: "/about",
    name: "About",
    component: About,
    props: true,
  },
  {
    path: "/404",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
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
