<template>
  <li class="tree-item-comp">
    <div class="tree-item-hd" @click="toggle">
      {{model.title}}
      <span class="toggle-icon" v-if="isFolder">[{{open? '-': '+'}}]</span>
    </div>
    <!-- 递归子Item -->
    <!-- 设计递归组件关键点二：递归有一个明确终止的条件 -->
    <ul v-if="isFolder" v-show="open">
      <tree-item v-for="model in model.children" :model="model" :key="model.title"></tree-item>
    </ul>
  </li>
</template>

<script>
export default {
  // 设计递归组件关键点一：必须有'name'选项
  name: "TreeItem",
  props: {
    model: {
      type: Object
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
    }
  },
  methods: {
    toggle() {
      if (this.isFolder) {
        this.open = !this.open;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.tree-item-comp {
  li {
    font-size: 22px;
    text-indent: 10px;
    li {
      font-size: 18px;
      text-indent: 20px;
      li {
        font-size: 14px;
        text-indent: 30px;
      }
    }
  }
}
.first-tree-item {
  >.tree-item-hd {
    font-size: 26px;
  }
}
</style>