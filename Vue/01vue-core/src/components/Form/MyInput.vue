<template>
  <div class="my-input-comp">
    <!-- 双绑：:value @input -->
    <!-- v-bind会展开$attrs对象 -->
    <input :type="type" :value="value" @input="inputHandler" v-bind="$attrs" />
  </div>
</template>

<script>
// import { findParent } from "@/libs/find-target";
import emitter from "@/libs/emitter";

export default {
  name: "MyInput",
  // 让父元素不要继承属性
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: "text"
    },
    value: {
      type: String,
      default: ""
    }
  },
  mixins: [emitter],
  methods: {
    inputHandler(e) {
      // 仅派发事件
      this.$emit("input", e.target.value);
      // 通知校验
      // this.$parent.$emit("validate")
      // 优化：确保this.$parent找到"MyFormItem"
      // 方法一：使用自定义的findParent方法
      // findParent("MyFormItem", this).$emit("validate");
      // 方法二：使用mixins + element-ui的emitter中的dispatch方法
      this.dispatch("ElFormItem", "validate");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>