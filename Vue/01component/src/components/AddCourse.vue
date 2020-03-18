<template>
  <div class="add-course-comp">
    <h4>{{addCourseTitle}}</h4>
    <div class="course-item">
      <label>课程名称:</label>
      <input type="text" placeholder="请输入课程名称" v-model="courseItem.name" />
    </div>
    <div class="course-item">
      <label>课程价格:</label>
      <input type="text" placeholder="请输入课程价格" v-model="courseItem.price" />
    </div>
    <button @click="addToLists">添加到课程列表</button>
  </div>
</template>

<script>
export default {
  name: "AddCourse",
  inject: ['addCourseTitle'],
  data() {
    return {
      courseItem: {
        name: "",
        price: null
      }
    };
  },
  methods: {
    addToLists() {
      // 兄弟组件通信方式一：
      // 通过共同的父组件，用事件把数据传给父组件，再油父组件传给子组件
      // this.$emit('addToLists', this.courseItem)
      // 兄弟组件通信方式二：
      // 通过共同的祖辈组件搭桥，$parent或$root
      if (this.courseItem.name && this.courseItem.price) {
        this.$parent.$emit("addToLists", this.courseItem)
        // 测试总线模式$bus,给App.vue传数据
        this.$bus.$emit('$busTest', this.courseItem.name)
        this.courseItem.name = ""
        this.courseItem.price = ""
      } else {
        alert('请输入完整的课程名称和价格');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>