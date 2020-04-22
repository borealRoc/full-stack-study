<template>
  <div class="nuxt-app">
    <nav class="nuxt-app-nav">
      <nuxt-link to="/">首页</nuxt-link>
      <!--别名:n-link，NLink，NuxtLink-->
      <n-link to="/foo">管理</n-link>
      <NLink to="/detail">购物车</NLink>
      <NuxtLink to="/login">登录</NuxtLink>
    </nav>
    <section class="nuxt-app-view">
      <nuxt />
    </section>
  </div>
</template>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
.nuxt-app .nuxt-app-nav {
  display: flex;
  width: 60%;
  height: 50px;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
}
.nuxt-app .nuxt-app-nav a {
  flex: 1;
  text-align: center;
}
.nuxt-app .nuxt-app-view {
  padding: 20px;
}
</style>
