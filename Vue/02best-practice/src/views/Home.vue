<template>
  <div class="home">
    <!-- svg基本用法 -->
    <!-- <svg>
      <use xlink:href="#icon-vue" />
    </svg> -->
    <!-- svg全局组件用法 -->
    <Icon icon-class="vue" class-name="svg-vue"/>
    <h1>This is an home page</h1>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
};
</script>

<style scoped>
.svg-vue {
  color: #e00000;
}
</style>
