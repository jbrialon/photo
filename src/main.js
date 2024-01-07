import { createApp, h } from "vue";
import App from "./App.vue";

import router from "./router";
import VueLazyLoad from "vue3-lazyload";
import { createI18n } from "vue-i18n";
import messages from "./data/i18n";

import { getNavigatorLanguage } from "./utils/Utils.js";

import "normalize.css";

const i18n = new createI18n({
  locale: getNavigatorLanguage(),
  messages,
  fallbackLocale: "fr",
});

// Vue.use(Meta);

const app = createApp({
  render: () => h(App),
});

app.use(router);
app.use(VueLazyLoad, {
  loading: "",
  error: "",
  lifecycle: {
    loading: (el) => {
      // console.log("loading", el);
    },
    error: (el) => {
      console.log("error", el);
    },
    loaded: (el) => {
      // console.log("loaded", el);
    },
  },
});
app.use(i18n);

app.mount("#app");
