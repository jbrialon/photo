<template>
  <div class="hello">
    <div class="hello__map">
      <mapbox
      access-token="pk.eyJ1IjoiamJyaWFsb24iLCJhIjoiZjJkNjkyNDNiMzU0YjAxY2FjNGZlMjU3MGFiYjYyZmQifQ.lwFTmFgGxSuvfoJdTcx7Jg"
      :map-options="{
        style: 'mapbox://styles/jbrialon/ck3yg7nb807lc1co990hb80mi/draft',
        center: [100.9925, 15.8700],
        zoom: 3,
      }"
      @map-load="loaded"
    />
    </div>
    <div class="hello__grid hello__grid--outer">
      <div class="title-wrap">
        <h1 class="title">{{ title }}</h1>
        <span class="subtitle">Octobre+Novembre</span>
        <span class="year">{{ new Date().getFullYear() }}</span>
      </div>
    </div>
    <div class="hello__grid">
      <div class="hello__item" v-for="(entry, propertyName, index) in menu" :key="index" @click="setDestination(propertyName)">
        <h2 class="hello__item-title"><span>{{ entry.displayName }}</span></h2>
        <span class="hello__item-number"><span>{{ formatIndex(index) }}</span></span>
        <div class="hello__item-imgwrap">
          <div class="hello__item-bg" v-lazy:background-image="entry.cover"></div>
          <div class="hello__item-img">
            <img :src="entry.cover.src" />
          </div>
        </div>
      </div>
      <div class="hello__item hello__item--more">
        More +
      </div>
    </div>
  </div>
</template>

<script>
import content from '../data/content'
import Mapbox from 'mapbox-gl-vue'

export default {
  name: 'hello',
  metaInfo: {
    title: content.meta.title,
    titleTemplate: `%s`,
    meta: content.meta.meta
  },
  data () {
    return {
      menu: content.octnov,
      title: content.meta.title,
      author: content.meta.author
    }
  },
  components: { Mapbox },
  methods: {
    loaded (map) {
      // var bounds = new mapboxgl.LngLatBounds()
      Object.keys(this.menu).forEach(key => {
        var gps = this.menu[key].gps
        var marker = new mapboxgl.Marker()
        var coord = new mapboxgl.LngLat(gps.lon, gps.lat)
        // bounds.extend(coord)
        marker.setLngLat(coord)
        marker.addTo(map)
      })
      // console.log(map.getZoom())
      // map.fitBounds(bounds)
      // map.setZoom(4)
    },
    setDestination (propertyName) {
      console.log(propertyName)
    },
    formatIndex (index) {
      return `0${index + 1}`
    }
  }
}
</script>

<style lang="scss">
@import '../scss/vars';
@import '../scss/mixins';

.hello {
  position:relative;
  width: 100vw;
  height: 100vh;
  .title-wrap {
    padding: 0;
    grid-area: 2 / 2 / 2 / 6;
    text-align: left;
    .title {
      font-size: 2.75vw;
      margin: 0;
      padding:0;
      font-size: 2rem;
      line-height: 1.2;
      margin-bottom:10px;
    }
    .subtitle {
      font-size: 1.25rem;
      margin: 0;
      margin-bottom:10px;
    }
    .year {
      font-size: 1.25rem;
      display: block;
      &:before {
        content: '―';
        margin-right: 0.5rem;
      }
    }
  }
  &__map {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    #map {
      width: 100vw;
      height: 100vh;
    }
    .mapboxgl-control-container {
      display: none !important;
    }
  }
  &__grid {
    display: grid;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    grid-template-columns: 17vw 21vw 17vw 17vw 8vw;
    grid-column-gap: 5vw;
    overflow: hidden;

    &--outer {
      padding: 0;
      grid-template-rows: 10rem auto;
      align-items: start;
    }
  }
  &__item {
    align-self: end;
    transform: translate3d(0,30px,0);
    cursor: pointer;
    &:before,
    &:after {
      content: '';
      display: block;
      position:absolute;
      bottom: 0;
      top: -100vh;
      width: 1px;
      background-color: #f3f3f3;
    }
    &:before {
      left: 0;
    }
    &:after {
      right: 0;
    }
    &:hover {
      .hello__item-bg {
        transform: translate3d(0px , 4px, 0) scale(0.99);
      }
      .hello__item-title {
        transform: translate3d(3px , 3px, 0);
      }
      .hello__item-number {
        transform: translate3d(0px , -4px, 0);
      }
    }
    &:nth-child(1) {
      transform: translate3d(0px , 160px, 0);
    }
    &:nth-child(2) {
      transform: translate3d(0px ,0, 0);
    }
    &:nth-child(3) {
      transform: translate3d(0px ,80px, 0);
    }
    &:nth-child(4) {
      transform: translate3d(0px ,0px, 0);
    }
    &-title {
      position: absolute;
      top: -2rem;
      right: -1.75rem;
      white-space: nowrap;
      margin: 0;
      z-index: 100;
      writing-mode: vertical-rl;
      letter-spacing: 1.1px;
      transition: transform 1.2s linear;
    }
    &-number {
      top: -2rem;
      right: 0;
      line-height: 1;
      position: absolute;
      font-size: 1.5rem;
      z-index: 100;
      writing-mode: vertical-rl;
      transition: transform 1.2s linear;
    }
    &--more {
      background: #333;
      color: #fff;
      cursor: pointer;
      height: calc(8vw + 30px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 1.15rem;
      position: relative;
      width: 100%;
      pointer-events: auto;
    }
  }
  &__item-imgwrap {
    position: relative;
    overflow: hidden;
  }
  &__item-bg {
    width: 120%;
    height: 120%;
    position: absolute;
    top: -10%;
    left: -10%;
    background-size: cover;
    transition: transform 1.2s linear;
  }
  &__item-img {
    img {
      display: block;
      width: 100%;
    }
  }
  
}
</style>
