<template>
  <li class="tree-item-comp">
    <div class="tree-item-hd" @click="toggle">
      {{model.title}}
      <span class="toggle-icon" v-if="isFolder">[{{open? '-': '+'}}]</span>
    </div>
    <!-- 递归子Item -->
    <ul v-if="isFolder" v-show="open">
      <tree-item v-for="model in model.children" :model="model" :key="model.title"></tree-item>
    </ul>
  </li>
</template>

<script>
export default {
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
    text-indent: 1em;
    li {
      text-indent: 2em;
      li {
        text-indent: 3em;
      }
    }
  }
}
</style>