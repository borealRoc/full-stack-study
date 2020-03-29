<template>
  <div class="my-form-comp">
    <slot></slot>
  </div>
</template>

<script> 
import { findChild } from "@/libs/find-target";

export default {
  name: "MyForm",
  provide() {
    return {
      form: this
    };
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    }
  },
  methods: {
    validate(cb) {
      // 全局校验
      // 1.不是所有项都需要校验, MyFormItem有prop属性才需要校验
      // 2. tasks是promise数组
      // const tasks = this.$children.filter(item => item.prop).map(item => item.validate())
      // findChild('MyFormItem', this)确保找到的子元素都是'MyFormItem'
      const tasks = findChild('MyFormItem', this).filter(item => item.prop).map(item => item.validate())
      // 3. 所有MyFormItem必须全通过, 整个表单才是验证通过
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false));
    }
  }
};
</script>

<style lang="scss" scoped>
</style>