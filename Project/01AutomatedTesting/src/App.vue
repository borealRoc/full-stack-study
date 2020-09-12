<template>
  <div id="app">
    <TestClick/>
  </div>
</template>

<script>
import TestClick from './components/TestClick.vue'

export default {
  name: 'App',
  components: {
    TestClick
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
