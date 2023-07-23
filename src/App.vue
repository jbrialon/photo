<template>
  <div id="app" v-cloak>
    <transition name="page" mode="out-in">
      <router-view class="page"></router-view>
    </transition>
  </div>
</template>

<script>
import content from "data/content";

export default {
  name: "app",
  metaInfo: {
    title: content.meta.title,
    titleTemplate: `%s // — ${content.meta.title}`,
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
