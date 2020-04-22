<template>
  <div id="app">
    <router-view></router-view>
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
  padding: 0;
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
