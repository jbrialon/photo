import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import prerender from "@prerenderer/rollup-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    prerender({
      routes: [
        "/",
        "/album/cevennes",
        "/album/bizikleta",
        "/album/indonesia",
        "/album/annapurna",
        "/album/japan",
        "/album/istanbul",
        "/album/myanmar",
        "/album/malaysia",
        "/album/kilimanjaro",
        "/octnov",
        "/404",
      ],
      renderer: "@prerenderer/renderer-puppeteer",
      rendererOptions: {
        skipThirdPartyRequests: true,
        renderAfterDocumentEvent: "custom-render-trigger",
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/gsap")) return "gsap";
          if (id.includes("node_modules/mapbox-gl")) return "mapbox";
          if (id.includes("node_modules/lodash")) return "lodash";
          if (
            id.includes("node_modules/vue/") ||
            id.includes("node_modules/vue-router") ||
            id.includes("node_modules/vue-i18n")
          )
            return "vue";
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
