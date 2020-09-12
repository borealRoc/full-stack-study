<template>
  <div id="app">
    <TestClick/>
    <!-- <TestAxios/> -->
    <TestGlobalComp @click="testEmit">halo</TestGlobalComp>
  </div>
</template>

<script>
import TestClick from './components/TestClick.vue'
// import TestAxios from './components/TestAxios.vue'

export default {
  name: 'App',
  components: {
    TestClick,
    // TestAxios
  },
  methods: {
    testEmit(msg) {
      console.log(msg)
    }
  },
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
