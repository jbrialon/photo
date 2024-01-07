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
  // metaInfo: {
  //   title: content.meta.title,
  //   titleTemplate: `%s // — ${content.meta.title}`,
  // },
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
