<template>
  <div class="hello">
    <article v-for="item in menu">
      <router-link :to="{ name: 'Album', params: { albumName: item.albumName }}">
        <h2>
          {{ item.name }}
        </h2>
        <div v-lazy:background-image="item.cover" class="img"></div>
      </router-link>
    </article>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      menu: [
        {
          name: 'ardèche',
          cover: require('../../static/ardeche/ardeche-14.jpg'),
          albumName: 'ardeche'
        },
        {
          name: ' Ísland',
          cover: require('../../static/islande/islande-53.jpg'),
          albumName: 'islande'
        },
        {
          name: ' interlac',
          cover: require('../../static/interlac/interlac-25.jpg'),
          albumName: 'interlac'
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
    background-color: #9e0000;

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
      transition:opacity 400ms cubic-bezier(.33,0,.2,1);
      will-change:opacity;
      top:50%;
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
      transition:opacity 400ms cubic-bezier(.33,0,.2,1);
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
