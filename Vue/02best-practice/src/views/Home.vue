<template>
  <div class="home">
    <!-- svg图标手动导入 -->
    <svg>
      <use xlink:href="#icon-vue" />
    </svg>
    <h1>This is home page.</h1>
    <p v-per="['admin']">你是admin才看得到我</p>
    <p v-per="['editor']">你是editor才看得到我</p>
  </div>
</template>

<script>

export default {
  name: "Home"
};
</script>
