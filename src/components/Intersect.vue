<template>
  <slot></slot>
</template>

<script>
export default {
  name: "intersect",
  props: {
    threshold: {
      type: Array,
      required: false,
      default() {
        return [0, 0.2];
      },
    },
    rootMargin: {
      type: String,
      required: false,
      default() {
        return "0px 0px 0px 0px";
      },
    },
  },
  emits: ["destroyed", "enter", "change", "leave"],
  mounted() {
    this.observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) {
          this.$emit("leave", [entries[0]]);
        } else {
          this.$emit("enter", [entries[0]]);
        }

        this.$emit("change", [entries[0]]);
      },
      {
        threshold: this.threshold,
        rootMargin: this.rootMargin,
      }
    );

    // TODO: should use this.$slots.default() element but it's null ...
    if (this.$el.parentElement) {
      this.observer.observe(this.$el.parentElement);
    }
  },
  unmounted() {
    this.$emit("destroyed");
    this.observer.disconnect();
  },
};
</script>
