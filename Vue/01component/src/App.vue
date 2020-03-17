<template>
  <div id="app">
    <ComPratice msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import ComPratice from './components/ComPratice.vue'

export default {
  name: 'app',
  components: {
    ComPratice
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
</style>
