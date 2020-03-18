<template>
  <div class="add-course-comp">
    <h4>新增课程</h4>
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
    name: 'AddCourse',
    data() {
        return {
            courseItem: {
                name: '',
                price: null
            }
        }
    },
    methods: {
        addToLists() {
            this.$emit('addToLists', this.courseItem)
            this.courseItem.name = ''
            this.courseItem.price = ''
        }
    },
};
</script>

<style lang="scss" scoped>
</style>