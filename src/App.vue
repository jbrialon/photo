<template>
  <div id="app" v-cloak>
    <router-view v-slot="{ Component }" class="page">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import content from "./data/content.js";

export default {
  name: "app",
  head() {
    const script = [];
    if (process.env.NODE_ENV === "production") {
      script.push({
        defer: true,
        src: "https://eu.umami.is/script.js",
        "data-website-id": "798c1bad-cde7-40be-a68f-b7deb279119d",
      });
    }
    return {
      title: content.meta.title,
      titleTemplate: `%s // — ${content.meta.title}`,
      script,
    };
  },
  mounted() {
    document.dispatchEvent(new Event("custom-render-trigger"));
  },
};
</script>

<style lang="scss">
@import "scss/main";

#app {
  overflow: hidden;
  width: 100%;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  .page {
    will-change: transform, opacity;
  }
}
</style>
