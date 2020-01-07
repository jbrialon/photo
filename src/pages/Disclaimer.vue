<template>
  <div class="disclaimer">
    <div class="disclaimer__content">
        <c-header></c-header>
        <div class="disclaimer__text">
          <br>
          <br>
          <br>
          <p>
            This page is desktop and tablet only, but you can see the photos <router-link :to="{ name: 'Travels'}">here</router-link>.
            <br>
            <br>
            Or send yourself an <a href="mailto:?subject=Oct+Nov%20-Nov%20Complètement%20à%20l'est&body=I%20really%20should%20visit%20https://www.completementalest.fr/octnov%20!">email</a> as a reminder to visit this page on your computer.
          </p>
        </div>
    </div>
  </div>
</template>

<script>
import content from '../data/content'
import Header from '../components/Header'

export default {
  name: 'Disclaimer Disclaimer',
  metaInfo: {
    title: 'Oct+Nov',
    meta: content.meta.octnov
  },
  components: {
    'c-header': Header
  }
}
</script>

<style scoped lang="scss">
@import '../scss/vars';
@import '../scss/mixins';

.disclaimer {
  width: 100%;
  min-height: -webkit-fill-available;
  header.header {
    margin: 0;
  }
  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    margin: auto;
    min-height: -webkit-fill-available;
  }
  &__text {
    width: 75%;
    p, 
    a {
      display: inline;
      
      font-family: 'Libre Baskerville';
      font-size: 1.1rem;
      line-height: 2.5rem;
      color: #fff;
      background: #000;
    }
    p {
      padding: 5px;
      width: 75%;
      box-shadow: -15px 0 0 0 #000, 15px 0 0 0 #000;
    }
  }
}
</style>
