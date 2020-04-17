<template>
  <svg :class="svgClass">
    <use :xlink:href="iconClass" />
  </svg>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      required: true
    },
    svgClass: {
      type: String,
      default: ""
    }
  },
  computed: {
    iconClass() {
      return `#icon-${this.iconName}`;
    }
  }
};
</script>

<style lang="scss" scoped>
svg {
  width: 20px;
  height: 20px;
  margin:  0 5px;
}
</style>