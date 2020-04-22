<template>
  <div>
    <h3 class="demo-title">Vuex基本用法</h3>
    <p>手榴弹扔了{{$store.state.grenade.count}}</p>
    <p>手榴弹还剩{{$store.getters['grenade/left']}}</p>
    <button @click="Throw">扔一个手榴弹</button><br>
    <button @click="asyncThrow">蓄力扔一个手榴弹</button>
    <button @click="restore">捡回炸弹</button>
  </div>
</template>

<script>
import MyPopup from "@/components/popup/MyPopup.vue";
export default {
  name: "VuexBasicUse",
  methods: {
    async Throw() {
      const result = await this.$store.dispatch("grenade/add");
      console.log('result', result)
      if (!result) {
        const notice = this.$create(MyPopup, {
          message: "没手榴弹了,别扔了",
          duration: 2000
        });
        notice.show();
      }
    },
    async asyncThrow() {
      const result = await this.$store.dispatch("grenade/asyncAdd");
      if (!result) {
        const notice = this.$create(MyPopup, {
          message: "没手榴弹了,别扔了",
          duration: 2000
        });
        notice.show();
      }
    },
    restore() {
      this.$store.dispatch("grenade/restore")
    }
  }
};
</script>

<style lang="scss" scoped>
</style>