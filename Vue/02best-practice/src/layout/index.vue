<template>
  <div class="best-app">
    <div class="best-router-link">
      <side-menu />
    </div>
    <div class="best-router-view">
      <router-view />
    </div>
  </div>
</template>
<script>
import SideMenu from "@/views/SideMenu";

export default {
  name: "Layout",
  components: {
    SideMenu
  }
};
</script>
<style lang="scss" scoped>
.best-app {
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .best-router-link {
    padding-left: 10px;
    padding-right: 10px;
    border-right: solid 1px #ccc;
    flex: 1;
    height: 100%;
    overflow: auto;
  }
  .best-router-view {
    padding: 0 20px;
    flex: 4;
    height: 100%;
    overflow: auto;
  }
}
</style>
