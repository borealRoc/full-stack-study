<template>
  <div class="my-router-view">
    <my-router-link to="/course">Course</my-router-link>
    <my-router-link to="/popup/test">Popup</my-router-link>
    <my-router-view />
  </div>
</template>

<script>
export default {
  name: "UseMyVueRouter",
};
</script>

<style lang="scss" scoped>
.my-router-view {
  a {
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 20px;
  }
}
</style>