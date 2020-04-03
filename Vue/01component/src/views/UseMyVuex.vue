<template>
  <div>
    <h3 class="demo-title">测试我手写的简版Vuex</h3>
    <p>手榴弹扔了{{$mystore.state.myCount}}</p>
    <p>手榴弹还剩{{$mystore.getters.myLeft}}</p>
    <button @click="Throw(2)">扔两个手榴弹</button><br>
    <button @click="restore">捡回炸弹</button>
  </div>
</template>

<script>

export default {
  name: "UseMyVuex",
  methods: {
   Throw(n) {
      const result = this.$mystore.dispatch("myAdd", n);
      console.log('result', result)
      // if (!result) {
      //   const notice = this.$create(MyPopup, {
      //     message: "没手榴弹了,别扔了",
      //     duration: 2000
      //   });
      //   notice.show();
      // }
    },
    restore() {
      this.$mystore.dispatch("myRestore")
    }
  }
};
</script>

<style lang="scss" scoped>
</style>