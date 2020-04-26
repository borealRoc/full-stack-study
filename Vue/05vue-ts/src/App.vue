<template>
  <div id="app">
    <Ts-syntax/>
    <Ts-vue/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TsSyntax from './components/TsSyntax.vue';
import TsVue from './components/TsVue.vue';

@Component({
  components: {
    TsSyntax,
    TsVue
  },
})
export default class App extends Vue {}
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
