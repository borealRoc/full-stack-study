<template>
  <div class="axios">
    <h2>axios 异步测试</h2>
    <app-button @click="getData">获取数据</app-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userinfo: {},
    };
  },
  methods: {
    getData() {
      return this.$axios.get("/users").then((res) => {
        this.userInfo = res.data;
        return res;
      });
    },
  },
};
</script>