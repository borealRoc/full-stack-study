<template>
  <div>
    <h2>全局组件测试</h2>
    <button class="app-btn" @click="onClick" :disabled="disabled">
      <slot>submit</slot>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick() {
      this.$emit("click", "测试全局组件的$emit");
    },
  },
};
</script>

<style scoped>
.app-btn {
  color: red;
}
</style>