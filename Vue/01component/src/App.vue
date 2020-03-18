<template>
  <div id="app">
    <ComPratice course="vue" title="组件化" ref="ComPratice" />
  </div>
</template>

<script>
import ComPratice from "./views/ComPratice.vue";

export default {
  name: "app",
  components: {
    ComPratice
  },
  mounted() {
    this.$refs.ComPratice.course = "VUE"
    this.$children[0].title = "组件化实践"
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
</style>
