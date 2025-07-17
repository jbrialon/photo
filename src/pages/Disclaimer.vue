<template>
  <div class="disclaimer">
    <div class="disclaimer__content">
      <c-header></c-header>
      <div class="disclaimer__text">
        <br />
        <br />
        <br />
        <p>
          {{ $t("disclaimer.paragraph1") }}
          <router-link :to="{ name: 'Travels' }">{{
            $t("disclaimer.link")
          }}</router-link
          >.
          <br />
          <br />
          <span v-html="$t('disclaimer.paragraph2')"></span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import content from "../data/content.js";
import Header from "../components/Header.vue";

export default {
  name: "Disclaimer",
  head() {
    return {
      title: "Oct+Nov",
      meta: content.meta.octnov,
    };
  },
  components: {
    "c-header": Header,
  },
};
</script>

<style lang="scss">
@use "../scss/vars" as *;
@use "../scss/mixins" as *;

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
    a,
    span a {
      display: inline;
      font-family: "Libre Baskerville";
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
