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
        renderAfterDocumentEvent: "custom-render-trigger",
      },
      postProcess(renderedRoute) {
        // Replace all http with https urls and localhost to your site url
        renderedRoute.html = renderedRoute.html
          .replace(/http:/i, "https:")
          .replace(
            /(https:\/\/)?(localhost|127\.0\.0\.1):\d*/i,
            process.env.CI_ENVIRONMENT_URL || ""
          );
      },
    }),
  ],
});
