<template>
  <div class="error-layout">
    <h1 v-if="error.statusCode === 404">页面不存在</h1>
    <h1 v-else>应用发生错误异常</h1>
    <p>{{error}}</p>
    <nuxt-link to="/">返回首页</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ["error"],
  layout: "blank"
};
</script>

<style scoped>
.error-layout {
    padding: 20px;
    text-align: center;
}
</style>