// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import Meta from "vue-meta";
import VueLazyload from "vue-lazyload";
import VueI18n from "vue-i18n";
import messages from "./data/i18n";

import { getNavigatorLanguage } from "./services/Utils.js";

import "normalize.css";

Vue.use(VueI18n);
Vue.use(Meta);
Vue.use(VueLazyload, {
  preLoad: 2,
  attempt: 3,
  observer: true,
});

const i18n = new VueI18n({
  locale: getNavigatorLanguage(),
  messages,
  fallbackLocale: "fr",
});

new Vue({
  el: "#app",
  i18n,
  router,
  template: "<App/>",
  components: { App },
});
