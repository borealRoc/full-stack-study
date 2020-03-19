<template>
  <div class="my-formitem-comp">
    <label v-if="label">{{label}}：</label>
    <slot></slot>
    <!-- 校验信息 -->
    <p v-if="errMes" class="err-tip">{{errMes}}</p>
  </div>
</template>

<script>
import Schema from "async-validator";
export default {
  inject: ["form"],
  props: {
    label: {
      type: String,
      default: ""
    },
    // 用于获取指定字段值和校验规则
    prop: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      errMes: ""
    };
  },
  mounted() {
    // 监听校验
    this.$on("validate", () => {
      this.validate();
    });
  },
  methods: {
    // 单项校验
    validate() {
      // 1.获取值和校验规则
      const value = this.form.model[this.prop];
      const rule = this.form.rules[this.prop];
      // 2.创建Schema实例 {username: rules}
      const schema = new Schema({ [this.prop]: rule });
      // 3.执行校验，校验对象,回调函数
      // validate返回校验结果Promise
      return schema.validate({ [this.prop]: value }, errors => {
        if (errors) {
          this.errMes = errors[0].message;
        } else {
          this.errMes = "";
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
</style>