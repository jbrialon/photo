import { createApp, h } from "vue";
import { VueHeadMixin, createHead } from "@unhead/vue";
import VueLazyLoad from "vue3-lazyload";
import { createI18n } from "vue-i18n";

import App from "./App.vue";
import router from "./router";
import messages from "./data/i18n";
import { getNavigatorLanguage } from "./utils/Utils.js";

import "normalize.css";
import "mapbox-gl/dist/mapbox-gl.css";

const head = createHead();
const i18n = new createI18n({
  locale: getNavigatorLanguage(),
  messages,
  fallbackLocale: "fr",
});

const app = createApp({
  render: () => h(App),
});

app.use(head);
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

app.mixin(VueHeadMixin);

app.mount("#app");
