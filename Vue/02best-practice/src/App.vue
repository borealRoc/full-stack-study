<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/news">News</router-link>
      <router-link to="/contact">Contact</router-link>
      <router-link to="/login">Login</router-link>
      <!-- <ul class="nav-link">
        <li v-per="['admin','editor']">
          <router-link to="/">Home</router-link>
        </li>
        <li v-per="['admin','editor']">
          <router-link to="/about">About</router-link>
        </li>
        <li v-per="['admin']">
          <router-link to="/news">News</router-link>
        </li>
        <li v-per="['editor']">
          <router-link to="/contact">Contact</router-link>
        </li>
        <li v-per="['admin','editor']">
          <router-link to="/login">Login</router-link>
        </li>
      </ul> -->
    </div>
    <router-view />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

ul {
  list-style: none;
}

.nav-link li {
  display: inline-block;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
  margin: 0 5px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
