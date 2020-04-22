<template>
  <div>
    <h2>admin page</h2>
    <p>必须登录才能访问.</p>
  </div>
</template>

<script>
export default {
  // 注册中间件
  middleware: ["auth"]
};
</script>

<style lang="scss" scoped>
</style>