<template>
  <div id="app">
    <VueCore course="vue" title="核心知识" ref="ComPratice" />
  </div>
</template>

<script>
import VueCore from "./views/VueCore.vue";

export default {
  name: "app",
  components: {
    VueCore
  },
  provide() {
    return {
      addCourseTitle: "新增课程",
      courseListsTitle: "课程列表",
      courseCartTitle: "课程购物车"
    };
  },
  mounted() {
    // this.$refs.ComPratice.course = "VUE"
    // this.$children[0].title = "组件化实践"
    // 测试总线模式$bus,接收AddCourse.vue传过来的数据
    this.$bus.$on("$busTest", arg => {
      console.log(arg);
    });
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
a {
  color: #111;
}
ul {
  list-style: none;
}
.demo-title {
  margin-bottom: 20px;
  font-size: 20px;
  text-align: center;
  color: #e00000;
}
</style>
