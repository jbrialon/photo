<template>
  <header class="header">
    <h1>
      <router-link to="/">
        {{ title }}
      </router-link>
    </h1>
    <ul>
      <li>
        <router-link :to="{ name: 'Octnov' }">
          {{ $t("menu.octnov") }}
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Travels' }">
          {{ $t("menu.travels") }}
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'About' }">
          {{ $t("menu.about") }}
        </router-link>
      </li>
      <li>
        <button @click="setLang('fr')" v-if="$i18n.locale == 'en'">🇫🇷</button>
        <button @click="setLang('en')" v-if="$i18n.locale == 'fr'">🇬🇧</button>
      </li>
    </ul>
  </header>
</template>

<script>
import content from "data/content";

export default {
  name: "c-header",
  data() {
    return {
      title: content.meta.title,
    };
  },
  methods: {
    setLang(lang) {
      this.$i18n.locale = lang;
    },
  },
};
</script>

<style lang="scss">
@import "../scss/vars";
@import "../scss/mixins";

header.header {
  display: flex;
  padding: 15px;
  margin: auto;
  h1 {
    font-weight: 400;
    margin: auto auto auto 0;
    border: 3px solid black;
    padding: 15px 20px;

    @include small-only {
      font-size: 22px;
      margin: auto;
    }

    a {
      color: black;
      text-decoration: none;
    }
  }

  ul {
    list-style: none;
    margin: auto 0 auto auto;
    font-size: 17px;

    @include small-only {
      display: none;
    }

    li {
      display: inline-block;
      margin-right: 15px;
      padding: 10px 0;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.16em;
      font-weight: 400;
      line-height: 1em;
      button {
        border: 0;
        background: 0;
        cursor: pointer;
      }
      a {
        text-decoration: none;
        color: black;
        transition: color 300ms $easing;

        &.active,
        &:hover {
          color: $red;
        }
      }

      &:after {
        content: "//";
      }

      &:last-child {
        margin-right: 0;
      }

      &:last-child:after {
        // content:'';
      }
    }
  }
}
</style>
