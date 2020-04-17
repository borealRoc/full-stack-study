<template>
  <ul class="side-menu-view">
    <tree-item
      v-for="route in permission_routes"
      :key="route.path"
      :model="route"
      :base-path="route.path"
    ></tree-item>
  </ul>
</template>

<script>
import { mapGetters } from "vuex"
import TreeItem from "@/components/TreeSideMenu"

export default {
  name: "SideMenu",
  components: {
    TreeItem
  },
  computed: {
    ...mapGetters(["permission_routes"])
  },
  created () {
      console.log('permission_routes', this.permission_routes);
  },
};
</script>

<style lang="scss" scoped>
</style>