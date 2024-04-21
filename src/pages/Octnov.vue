<template>
  <div class="octnov" :class="{ ipad: isTablet }">
    <transition name="fade">
      <div class="octnov__loader" v-if="!loaded">
        <loader></loader>
        <p>
          {{ loadingText }}
        </p>
      </div>
    </transition>
    <div class="octnov__orientation" v-if="portrait">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        enable-background="new 0 0 100 100"
        xml:space="preserve"
      >
        <g>
          <path
            fill="none"
            stroke="#000000"
            stroke-width="2"
            stroke-miterlimit="10"
            d="M55.5,90V10c0-2.8-2.2-5-5-5H10.7c-2.8,0-5,2.2-5,5   v80c0,2.8,2.2,5,5,5h39.8C53.3,95,55.5,92.8,55.5,90z M30.6,92.4c-1.4,0-2.6-1.1-2.6-2.6s1.1-2.6,2.6-2.6c1.4,0,2.6,1.1,2.6,2.6   S32,92.4,30.6,92.4z M51.6,82.7c0,1.1-0.9,2-2,2H11.7c-1.1,0-2-0.9-2-2V14c0-1.1,0.9-2,2-2h37.9c1.1,0,2,0.9,2,2V82.7z"
          />
          <path
            fill="none"
            stroke="#000000"
            stroke-width="2"
            stroke-miterlimit="10"
            d="M90.1,45.1H55.5v4h30.6c1.1,0,2,0.9,2,2V89   c0,1.1-0.9,2-2,2l-30.7,0c-1.4,3.7-3.5,3.8-4.9,4l39.5-0.1c2.8,0,5-2.2,5-5V50.1C95.1,47.4,92.8,45.1,90.1,45.1z"
          />
          <g>
            <g>
              <path
                fill="none"
                stroke="#000000"
                stroke-width="2"
                stroke-miterlimit="10"
                d="M61.1,9.6c14.5,0,26.6,10,29.9,23.6"
              />
              <g>
                <polygon points="85.7,32.5 91.8,40.3 95.6,31.1     " />
              </g>
            </g>
          </g>
        </g>
      </svg>
      {{ $t("octnov.landscape") }}
    </div>
    <transition name="slide-fade">
      <div class="octnov__badges" v-if="!activeDestination">
        <ul>
          <li>
            <a
              href="https://cssdesignawards.com/sites/completement-a-lest-oct-nov/36693/"
              target="_blank"
            >
              <img
                src="../assets/best-ui-black.png"
                alt="CSSDA Best UI Design Badge"
              />
            </a>
          </li>
          <li>
            <a
              href="https://cssdesignawards.com/sites/completement-a-lest-oct-nov/36693/"
              target="_blank"
            >
              <img
                src="../assets/best-ux-black.png"
                alt="CSSDA Best UX Design Badge"
              />
            </a>
          </li>
          <li>
            <a
              href="https://cssdesignawards.com/sites/completement-a-lest-oct-nov/36693/"
              target="_blank"
            >
              <img
                src="../assets/best-innovation-black.png"
                alt="CSSDA Best Innovation Badge"
              />
            </a>
          </li>
        </ul>
      </div>
    </transition>
    <div class="octnov__content js-content" ref="content">
      <Album
        v-if="activeDestination"
        :destination="activeDestination"
        :toggle-action="toggleAction"
        :map="map"
        :marker="activeMarker"
        :back="toggle"
      ></Album>
    </div>
    <div class="octnov__map" v-cloak>
      <div id="map" ref="map"></div>
    </div>
    <div class="octnov__grid octnov__grid--outer">
      <div class="title-wrap" ref="title">
        <h1 class="title">{{ title }}</h1>
        <span class="subtitle">{{ $t("octnov.subtitle") }}</span>
        <span class="year">
          2019
          <span class="lang">
            <button @click="setLang('fr')" v-if="$i18n.locale == 'en'">
              🇫🇷
            </button>
            <button @click="setLang('en')" v-if="$i18n.locale == 'fr'">
              🇬🇧
            </button>
          </span>
        </span>
      </div>
      <div class="subtitle-wrap" ref="subtitle">
        <h2 class="title" v-if="activeDestination">
          {{ $t(`albums.${activeDestination.name}.displayName`) }}
        </h2>
        <span class="subtitle" v-if="activeDestination">{{
          activeDestination.text
        }}</span>
      </div>
    </div>
    <div class="octnov__grid" ref="items">
      <div
        class="octnov__item"
        ref="item"
        v-for="(entry, propertyName, index) in menu"
        :key="index"
        @click="setDestination(propertyName)"
      >
        <h2 class="octnov__item-title">
          <span>{{ $t(`albums.${propertyName}.displayName`) }}</span>
        </h2>
        <span class="octnov__item-number"
          ><span>{{ formatIndex(index) }}</span></span
        >
        <div class="octnov__item-imgwrap">
          <img class="octnov__item-img" :src="entry.cover" />
        </div>
      </div>
      <div class="octnov__item octnov__item--more" ref="more">
        <router-link :to="{ name: 'Travels' }" ref="togglemore">
          {{ $t("octnov.more") }}
        </router-link>
        <button
          @click="toggle('show')"
          ref="toggleBack"
          v-show="activeDestination"
        >
          {{ $t("octnov.back") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { getMarkerOffset, preloadFirstImages } from "../utils/Utils.js";
import MobileDetect from "mobile-detect";

import Album from "../components/Album.vue";
import loader from "../components/Loader.vue";
import content from "../data/content.js";

const md = new MobileDetect(window.navigator.userAgent);
let winsize = { width: window.innerWidth, height: window.innerHeight };

export default {
  name: "OctNov",
  head() {
    return {
      title: "Oct+Nov",
      meta: content.meta.octnov,
    };
  },
  data() {
    return {
      menu: content.octnov,
      title: content.meta.title,
      map: null,
      markers: {},
      activeDestination: null,
      toggleAction: null,
      loaded: false,
      mapOptions: {
        token:
          "pk.eyJ1IjoiamJyaWFsb24iLCJhIjoiZjJkNjkyNDNiMzU0YjAxY2FjNGZlMjU3MGFiYjYyZmQifQ.lwFTmFgGxSuvfoJdTcx7Jg",
        style: "mapbox://styles/jbrialon/ck3yg7nb807lc1co990hb80mi/draft",
        center: [100.9925, 15.87],
        zoom: 3,
      },
      isTablet: md.tablet() !== null || winsize.width === 1194,
      index: 0,
      portrait: window.matchMedia("(orientation: portrait)").matches,
    };
  },
  components: {
    Album,
    loader,
  },
  methods: {
    mapload() {
      this.map.scrollZoom.disable();
      Object.keys(this.menu).forEach((key) => {
        let gps = this.menu[key].gps;
        let marker = new mapboxgl.Marker();
        let coord = new mapboxgl.LngLat(gps.lon, gps.lat);
        marker.setLngLat(coord);
        marker.addTo(this.map);
        marker
          .getElement()
          .addEventListener("click", () => this.setDestination(key));
        this.markers[key] = marker;
      });
    },
    resetMarkerPosition() {
      Object.keys(this.menu).forEach((key) => {
        let gps = this.menu[key].gps;
        let coord = new mapboxgl.LngLat(gps.lon, gps.lat);
        this.markers[key].setLngLat(coord);
      });
    },
    setDestination(propertyName) {
      this.toggle("hide");
      this.activeDestination = content.octnov[propertyName];
      let destinationGPS = new mapboxgl.LngLat(
        this.activeDestination.gps.lon,
        this.activeDestination.gps.lat
      );

      // hide all markers but the one from the selected destination
      Object.keys(this.markers).forEach((key) => {
        if (key !== propertyName) {
          this.markers[key].getElement().style.visibility = "hidden";
        }
      });

      this.map.easeTo({
        center: destinationGPS,
        zoom: this.mapOptions.zoom + 3,
        duration: 1600,
        offset: getMarkerOffset(),
      });
    },
    toggle(action) {
      this.toggleAction = action;
      if (action === "show") {
        this.map.easeTo({
          center: this.mapOptions.center,
          zoom: this.mapOptions.zoom,
          duration: 1600,
          pitch: 0,
        });
        Object.keys(this.markers).forEach((key) => {
          this.markers[key].getElement().style.visibility = "visible";
        });
        this.resetMarkerPosition();
      }

      let delay = 0.2;
      // country items animation
      this.$refs.item.forEach((item) => {
        let speed = this.randomNumber(1, 1.5);
        gsap.to(item, {
          duration: speed,
          ease: "power4.inOut",
          y: action === "hide" ? -1 * winsize.height - 30 : 0,
        });
      });

      // button more/back animation
      let speedMore = this.randomNumber(1, 1.1);
      let moreButton = this.$refs.more;
      gsap.to(moreButton, {
        duration: speedMore,
        delay: delay,
        ease: "power4.inOut",
        y:
          action === "hide" ? -1 * winsize.height + moreButton.offsetHeight : 0,
      });

      gsap.to(moreButton, {
        duration: speedMore / 2,
        delay: delay,
        ease: "power4.in",
        scaleY: 2,
      });

      gsap.to(moreButton, {
        duration: speedMore / 2,
        delay: delay + speedMore / 2,
        ease: "power4.out",
        scaleY: 1,
      });
      gsap.to(this.$refs.more.querySelector("a"), {
        duration: action === "hide" ? 0.2 : 0.4,
        delay: action === "hide" ? 0.2 : 1,
        ease: action === "hide" ? "power4.in" : "power4.out",
        startAt: action === "hide" ? {} : { opacity: 0, y: "-150%" },
        y: action === "hide" ? "-150%" : "0%",
        opacity: action === "hide" ? 0 : 1,
      });
      gsap.to(this.$refs.more.querySelector("button"), {
        duration: action === "hide" ? 0.4 : 0.2,
        delay: action === "hide" ? 1 : 0.2,
        ease: action === "hide" ? "power4.out" : "power4.in",
        startAt: action === "hide" ? { opacity: 0, y: "150%" } : {},
        y: action === "hide" ? "0%" : "150%",
        opacity: action === "hide" ? 1 : 0,
      });
      // content
      gsap.to(this.$refs.content, {
        duration: action === "show" ? 1.15 : 1,
        delay: delay,
        ease: action === "show" ? "power4.inOut" : "power4.out",
        y: action === "show" ? "100%" : "-100%",
        onComplete: () => {
          if (action === "show") {
            this.activeDestination = null;
          }
        },
      });
      // titles + subtitles
      gsap.to(this.$refs.title, {
        duration: action === "show" ? 1.15 : 1,
        delay: delay,
        ease: "power4.inOut",
        y:
          action === "hide" ? -1 * winsize.height + moreButton.offsetHeight : 0,
      });
      gsap.to(this.$refs.subtitle, {
        duration: action === "show" ? 0.4 : 1,
        delay: delay,
        alpha: action === "show" ? 0 : 1,
        ease: "power4.inOut",
      });
    },
    formatIndex(index) {
      return `0${index + 1}`;
    },
    randomNumber(min, max) {
      return Math.random() * (max - min) + min;
    },
    setLang(lang) {
      this.$i18n.locale = lang;
    },
  },
  computed: {
    activeMarker() {
      return this.markers && this.activeDestination
        ? this.markers[this.activeDestination.name]
        : null;
    },
    loadingText() {
      return this.$t(`loader.${this.index}`);
    },
  },
  mounted() {
    window.addEventListener("resize", () => {
      winsize = { width: window.innerWidth, height: window.innerHeight };
      this.portrait = window.matchMedia("(orientation: portrait)").matches;
    });

    // Loader text
    this.index = Math.round(this.randomNumber(0, 7));
    const Interval = setInterval(() => {
      this.index = Math.round(this.randomNumber(0, 7));
    }, 1700);

    // map setup
    mapboxgl.accessToken = this.mapOptions.token;
    this.map = new mapboxgl.Map({
      container: "map", // container id
      style: this.mapOptions.style, // stylesheet location
      center: this.mapOptions.center, // starting position [lng, lat]
      zoom: this.mapOptions.zoom, // starting zoom
    });
    this.map.on("load", this.mapload);

    // when first images have loaded we hide the loader
    preloadFirstImages().then(() => {
      this.loaded = true;
      clearInterval(Interval);
    });
  },
};
</script>

<style lang="scss">
@import "../scss/vars";
@import "../scss/mixins";

.octnov {
  position: relative;
  width: 100vw;
  // height: 100vh;
  &.ipad {
    height: auto;
    min-height: -webkit-fill-available;
    .octnov__grid {
      height: auto;
      min-height: -webkit-fill-available;
    }
  }

  .title-wrap {
    padding: 0;
    grid-area: 2 / 2 / 2 / 6;
    text-align: left;

    .title {
      font-size: 2.75vw;
      margin: 0;
      padding: 0;
      font-size: 2rem;
      line-height: 1.2;
      margin-bottom: 10px;
    }

    .subtitle {
      font-size: 1.25rem;
      margin: 0;
      margin-bottom: 10px;
    }

    .year {
      font-size: 1.25rem;
      display: block;

      &:before {
        content: "―";
        margin-right: 0.5rem;
      }
    }

    .lang {
      pointer-events: all;

      button {
        background: none;
        padding: 0;
        margin: 0 0 0 10px;
        border: none;
        cursor: pointer;
      }
    }
  }

  .subtitle-wrap {
    position: relative;
    z-index: 30;
    grid-area: 2 / 3;
    margin-right: 15px;
    writing-mode: vertical-rl;
    text-align: left;
    opacity: 0;

    @include ipad {
      margin-right: 5px;
    }

    .title {
      font-size: 2rem;
      line-height: 1.2;
      letter-spacing: 0.5px;
      font-weight: 600;
      padding: 0;
      margin: 0;

      @include ipad {
        font-size: 1.3rem;
      }
    }

    .subtitle {
      font-weight: 400;
      display: block;
      font-size: 1.7rem;
      @include ipad {
        font-size: 1rem;
      }
    }
  }

  &__orientation {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    z-index: 20;
    background: white;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    svg {
      width: 30vw;
      margin-bottom: 30px;
    }
  }

  &__badges {
    position: absolute;
    z-index: 19;
    right: 0;
    top: 10vh;
    cursor: pointer;

    &:hover {
      li {
        transform: translateX(0) rotate(0deg);
      }
    }

    ul {
      list-style: none;
      margin: 0;
    }

    li {
      width: 77px;
      margin: 10px;
      transition: transform 250ms cubic-bezier(0.785, 0.135, 0.15, 0.86);
      transform: translateX(56px) rotate(-90deg);
      will-change: transform;

      &:nth-child(1) {
        transition-delay: 0;
      }

      &:nth-child(2) {
        transition-delay: 80ms;
      }

      &:nth-child(3) {
        transition-delay: 180ms;
      }
    }

    img {
      width: 100%;
    }
  }

  &__loader {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    z-index: 20;
    background: white;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    p {
      color: #949494;
      font-weight: 500;
      letter-spacing: 0.5px;
      // font-size: 1.1rem;
      text-transform: uppercase;
    }
  }

  &__content {
    position: absolute;
    top: 100vh;
    left: 0;
    width: 65vw;
    padding: 10vh 10vh 10vh 5vh;
    z-index: 10;
    height: 100vh;
    background-color: #e5e5e5;
    overflow: auto;
  }

  &__map {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    #map {
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
    height: 100vh;
    width: 100vw;
    grid-template-columns: 17vw 21vw 17vw 17vw 8vw;
    grid-column-gap: 5vw;
    overflow: hidden;
    pointer-events: none;

    &--outer {
      position: relative;
      padding: 0;
      grid-template-rows: 10rem auto;
      align-items: start;
    }
  }

  &__item {
    align-self: end;
    transform: translate3d(0, 30px, 0);
    cursor: pointer;
    pointer-events: all;

    &:before,
    &:after {
      content: "";
      display: block;
      position: absolute;
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
      .octnov__item-title {
        transform: translate3d(3px, 3px, 0);
      }

      .octnov__item-number {
        transform: translate3d(0px, -4px, 0);
      }
    }

    &:last-child:after {
      display: none;
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

      @include ipad {
        font-size: 1.4rem;
      }
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

      @include ipad {
        font-size: 1.2rem;
      }
    }

    &--more {
      display: flex;
      position: relative;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #333;
      height: 8vw;
      width: 100%;
      transform: none;
      cursor: default;

      button,
      a {
        cursor: pointer;
        opacity: 1;
        color: #fff;
        font-size: 1.15rem;
        font-weight: 600;
        text-decoration: none;
      }

      button {
        opacity: 0;
        background: none;
        border: none;
        position: absolute;
      }
    }
  }

  &__item-imgwrap {
    position: relative;
    overflow: hidden;
  }

  &__item-img {
    display: block;
    width: 100%;
  }
}
</style>
