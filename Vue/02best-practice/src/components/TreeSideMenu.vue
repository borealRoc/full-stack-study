<template>
  <li v-if="!model.hidden" class="tree-item">
    <div class="first-menu">
      <svg-icon v-if="hasIcon" :icon-name="model.meta.icon" />
      <!-- 如果有子节点 -->
      <h4 v-if="isFolder" @click="toggle">
        {{model.meta.title}}
        <svg-icon v-if="open" icon-name="arr_up" />
        <svg-icon v-else icon-name="arr_down" />
      </h4>
      <!-- 如果是叶子节点 -->
      <router-link v-else :to="resolvePath(model.path)">{{model.meta.title}}</router-link>
    </div>
    <!-- 递归子Item -->
    <ul v-if="isFolder" v-show="open">
      <tree-item
        v-for="route in model.children"
        :key="route.path"
        :model="route"
        :base-path="resolvePath(model.path)"
      ></tree-item>
    </ul>
  </li>
</template>

<script>
import path from "path";
export default {
  name: "TreeItem",
  props: {
    model: {
      type: Object
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      open: false
    };
  },
  computed: {
    isFolder() {
      return this.model.children && this.model.children.length;
    },
    hasIcon() {
      return this.model.meta && this.model.meta.icon;
    }
  },
  methods: {
    resolvePath(routePath) {
      // 解析路由路径
      return path.resolve(this.basePath, routePath);
    },
    toggle() {
      if (this.isFolder) {
        this.open = !this.open;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"  scoped>
.tree-item {
  li {
    margin: 10px;
  }
}
.first-menu {
  display: flex;
  h4 {
    display: flex;
    margin-top: 0;
    margin-bottom: 0;
  }
}
</style>
