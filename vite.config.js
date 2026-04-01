import { defineConfig } from "vite";
import { writeFileSync } from "fs";
import path from "path";

import vue from "@vitejs/plugin-vue";
import prerender from "@prerenderer/rollup-plugin";

const rendererOptions = {
  skipThirdPartyRequests: true,
  renderAfterDocumentEvent: "custom-render-trigger",
};

// specific fix for vite8 and path /
function prerenderRootPlugin() {
  return {
    name: "prerender-root",
    apply: "build",
    async closeBundle() {
      const { default: Prerenderer } = await import("@prerenderer/prerenderer");
      const staticDir = path.resolve(process.cwd(), "dist");
      const instance = new Prerenderer({
        staticDir,
        renderer: "@prerenderer/renderer-puppeteer",
        rendererOptions,
      });
      try {
        await instance.initialize();
        const [route] = await instance.renderRoutes(["/"]);
        writeFileSync(path.join(staticDir, "index.html"), route.html.trim());
      } finally {
        await instance.destroy();
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    prerender({
      routes: [
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
      rendererOptions,
    }),
    prerenderRootPlugin(),
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
