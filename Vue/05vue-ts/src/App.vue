<template>
  <div id="app">
    <Ts-syntax />
    <!-- <Ts-vue title="TSVue" @add-feature="onAddFeature" /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TsSyntax from "./components/TsSyntax.vue";
import TsVue, { FeatureInterface } from "./components/TsVue.vue";

@Component({
  components: {
    TsSyntax,
    TsVue
  }
})
export default class App extends Vue {
  onAddFeature(feature: FeatureInterface) {
    console.log('监听TsVue组件派发的addFeature事件', feature.name);
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
