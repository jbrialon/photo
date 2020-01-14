<template>
  <div class="notfound">
    <c-header></c-header>
    <article class="notfound__article">
      <h1>
        Not Found
      </h1>
    </article>
    <c-footer></c-footer>
  </div>
</template>

<script>
import content from '../data/content'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default {
  name: 'NotFound',
  metaInfo: {
    title: content.meta.title,
    titleTemplate: `%s`,
    meta: content.meta.meta
  },
  components: {
    'c-header': Header,
    'c-footer': Footer
  }
}
</script>

<style scoped lang="scss">
@import '../scss/vars';
@import '../scss/mixins';

.notfound {
  width:100%;
  display:flex;
  flex-wrap: wrap;
  justify-content: center;
  min-height: 100vh;
  header.header {
    width: calc(100vw - 15px);
    // height: 10vh;
    padding: 15px;
  }
  &__article {
    position: relative;
    width:calc(100vw - 45px);
    height: 76vh;
    display: flex;
    align-items: center;
    justify-content: center;
    @include small-only {
      width:90%;
      height:auto;
      padding: 5vw 0 25vw 0;
    }
    h1 {
      font-size: 25vw;
      text-transform: uppercase;
    }
  }
}
</style>
