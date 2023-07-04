<template>
  <div class="stats" v-if="stats">
    <div class="inner">
      <h3>
        {{ $t("octnov.lens") }}
      </h3>
      <div class="pie" :style="getPieStyle()"></div>
      <ul>
        <li v-for="(lens, index) in statsData.lensStats" :key="index">
          {{ Math.round(lens[1]) }}% Fujinon {{ lens[0] }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import stats from "../data/stats";

export default {
  name: "stats",
  data() {
    return {
      statsData: stats,
    };
  },
  methods: {
    getPieStyle() {
      const style = {};
      this.statsData.lensStats.map((lens, index) => {
        style[`--segment${index + 1}`] = lens[1];
      });
      return style;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../scss/vars";
@import "../scss/mixins";

.stats {
  position: absolute;
  cursor: pointer;
  z-index: 999999;
  background: white;
  top: 20vh;
  left: 20vw;
  right: 20vw;
  bottom: 20vh;
  z-index: 10;
  .inner {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 10;
    background: white;
  }
  &:before {
    position: fixed;
    display: block;
    content: "";
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.75);
    z-index: -1;
  }
  .pie {
    display: inline-block;
    width: 20vh;
    height: 20vh;
    border-radius: 50%;
    border: 0.15em solid #fff;
    box-shadow: 0 0.075em 0.2em 0.05em rgba(0, 0, 0, 0.25);
    background-origin: border-box;
    background-image: conic-gradient(
      #d44 calc(3.6deg * var(--segment1, 100)),
      #fc3 0 calc(3.6deg * var(--segment2, 100)),
      #ac0 0 calc(3.6deg * var(--segment3, 100)),
      #0ac 0 calc(3.6deg * var(--segment4, 100)),
      #f7b 0
    );
  }
  ul {
    list-style: none;
    li {
      position: relative;
      text-align: left;
      padding: 5px;
      font-size: 0.7em;
      letter-spacing: 1px;
      &:nth-child(1):before {
        background: #d44;
      }
      &:nth-child(2):before {
        background: #fc3;
      }
      &:nth-child(3):before {
        background: #0ac;
      }
      &:before {
        position: absolute;
        content: "";
        left: -20px;
        width: 15px;
        height: 15px;
      }
    }
  }
}
</style>
