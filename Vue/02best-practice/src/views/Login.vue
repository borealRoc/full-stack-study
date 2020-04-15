<template>
  <div class="login-comp">
    <svg-icon icon-name="login" svg-class="svg-login" />
    <h1>This is login page.</h1>
    <div class="login-ctn">
      <input type="text" placeholder="请输入用户名" v-model="username" />
      <el-button type="primary" @click="login">登录</el-button>
      <el-button @click="logout">注销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: ""
    };
  },
  methods: {
    async login() {
      const ret = await this.$store.dispatch("user/login", {
        username: this.username
      });
      if (ret) {
        const { redirect = "/" } = this.$route.query;
        console.log('redirect', redirect) 
        this.$router.push(redirect);
      } else {
        this.$message("有错误了...");
      }
    },
    async logout() {
      await this.$store.dispatch("user/resetToken");
      this.$message("注销成功...");
    }
  }
};
</script>

<style lang="scss" scoped>
.svg-login {
  color: #e00000;
}
.login-ctn {
  width: 60%;
  margin: 0 auto;
  input {
    display: block;
    width: 100%;
    padding: 0 20px;
    font-size: 16px;
    line-height: 40px;
    margin-bottom: 20px;
    outline: 0;
  }
}
</style>