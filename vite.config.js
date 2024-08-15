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
});
