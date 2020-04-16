<template>
  <div class="login-comp">
    <svg-icon icon-name="login" svg-class="svg-login" />
    <h1>This is login page.</h1>
    <div class="has-login-ctn" v-if="$store.state.user.token">
      <h2>欢迎你，{{$store.state.user.token}}</h2>
      <el-button @click="logout">注销</el-button>
    </div>
    <div class="login-ctn" v-else>
      <input type="text" placeholder="请输入用户名" v-model="username" />
      <el-button type="primary" @click="login">登录</el-button>
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
      try {
        await this.$store.dispatch("user/login", { username: this.username })
        const { redirect = "/" } = this.$route.query
        this.$router.push(redirect)
      } catch (error) {
        this.$message.error(error)
      }
    },
    async logout() {
      await this.$store.dispatch("user/resetToken")
      this.$message({
        message: "注销成功",
        type: success
      })
    }
  }
}
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