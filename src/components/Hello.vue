<template>
  <div class="hello">
    <article>
      <router-link :to="{ name: 'Album', params: { albumName: 'ardeche' }}">
        <h2>
          ardeche
        </h2>
        <img src="static/ardeche/Ardeche-14.jpg" alt="">
      </router-link>
    </article>
    <article>
      <router-link :to="{ name: 'Album', params: { albumName: 'islande' }}">
        <h2>
          islande
        </h2>
        <img src="static/islande/islande-53.jpg" alt="">
      </router-link>
    </article>
    <article>
      <router-link :to="{ name: 'Album', params: { albumName: 'interlac' }}">
        <h2>
          interlac
        </h2>
        <img src="static/interlac/interlac-25.jpg" alt="">
      </router-link>
    </article>
  </div>
</template>

<script>
export default {
  name: 'hello'
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
    width: calc(50% - 2px);
    height:60vh;
    overflow:hidden;
    border-bottom: 2px solid white;
    cursor:pointer;
    // background-color: #9e0000;

    &:hover {
      h2 {
        opacity:1;
      }

      img {
        opacity:0.75;
      }
    }

    &:nth-child(even) {
      border-left: 2px solid white;
    }

    &:nth-child(even) {
      border-right: 2px solid white;
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
      line-height: 1.25em;
      letter-spacing: .02em;
      line-height: 1.1em;
      text-transform: uppercase;
      letter-spacing: .12em;
      font-weight: 700;
      font-style: normal;
      padding:4px 8px;
      display: inline-block;
      max-width: 70%;
    }

    img {
      z-index:0;
      opacity:1;
      transition:opacity 400ms cubic-bezier(.33,0,.2,1);
      will-change:opacity;
      position:absolute;
      width:100%;
      top:50%;
      left:50%;
      transform:translate(-50%, -50%);
    }
  }
}
</style>
