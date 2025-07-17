<template>
  <footer>
    <p>{{ author }} © {{ new Date().getFullYear() }} //</p>
  </footer>
</template>

<script>
import content from "../data/content";

export default {
  name: "c-footer",
  data() {
    return {
      author: content.meta.author,
    };
  },
};
</script>

<style scoped lang="scss">
@use "../scss/vars" as *;
@use "../scss/mixins" as *;

footer {
  display: flex;
  text-transform: uppercase;
  height: 10vh;
  padding: 15px;
  width: 100%;

  p {
    font-weight: 400;
    font-size: 12px;
    margin: auto 0 auto auto;
  }
}
</style>
