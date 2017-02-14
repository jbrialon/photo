<template>
  <div class="hello">
    <article v-for="item in menu">
      <router-link :to="{ name: 'Album', params: { name: item.name }}">
        <h2>
          {{ item.displayName }}
        </h2>
        <div v-lazy:background-image="item.cover" class="img"></div>
      </router-link>
    </article>
  </div>
</template>

<script>
export default {
  name: 'hello',
  metaInfo: {
    title: 'Complétement à l\'est //'
  },
  data () {
    return {
      menu: [
        {
          name: 'ardeche',
          displayName: 'ardèche',
          cover: require('../assets/photos/ardeche/ardeche-14.jpg')
        },
        {
          name: 'islande',
          displayName: ' Ísland',
          cover: require('../assets/photos/islande/islande-53.jpg')
        },
        {
          name: 'interlac',
          displayName: ' interlac',
          cover: require('../assets/photos/interlac/interlac-25.jpg')
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
@import '../scss/vars';

.hello {
  width:100%;
  display:flex;
  flex-wrap: wrap;
  justify-content: center;

  article {
    position:relative;
    width: 50%;
    height:55vh;
    overflow:hidden;
    border-bottom: 2px solid white;
    cursor:pointer;
    background-color: $red;

    &:nth-child(even) {
      border-left: 1px solid white;
    }

    &:nth-child(odd) {
      border-right: 1px solid white;
    }

    a {
      display:block;
      width:100%;
      height:100%;
    }

    &:hover {
      h2 {
        opacity:1;
      }

      .img[lazy=loaded] {
        opacity:0.75;
      }
    }

    h2 {
      position:absolute;
      opacity:0;
      z-index:1;
      transition:opacity 400ms $easing;
      will-change:opacity;
      top:45%;
      left:50%;
      transform:translate(-50%, -50%);
      color:white;
      background:black;
      font-size: 42px;
      line-height: 1.1em;
      text-transform: uppercase;
      letter-spacing: .12em;
      font-weight: 700;
      padding:4px 8px;
      display: inline-block;
      max-width: 70%;
    }

    .img {
      position:absolute;
      top:0;
      left:0;
      bottom:0;
      right:0;
      z-index:0;
      opacity:0;
      transition:opacity 400ms $easing;
      will-change:opacity;
      background-repeat:no-repeat;
      background-position:center;
      background-size: cover;
    }

    .img[lazy=loaded] {
      opacity: 1;
    }
  }
}
</style>
