<template>
  <div class="course-view">
    <!-- <AddCourse @addToLists="addToLists" /> -->
    <AddCourse @addToLists="addToLists" />
    <CourseList :courseLists="courseLists" @addToCart="addToCart" />
    <CourseCart
      :courseCarts="courseCarts"
      @courseCartAdd="courseCartAdd"
      @courseCartMinus="courseCartMinus"
    />
  </div>
</template>

<script>
import AddCourse from "../components/AddCourse.vue";
import CourseList from "../components/CourseList.vue";
import CourseCart from "../components/CourseCart.vue";

export default {
  name: "Course",
  components: {
    AddCourse,
    CourseList,
    CourseCart
  },
  mounted () {
    this.$on('addToLists', this.addToLists)
  },
  data() {
    return {
      courseLists: [
        {
          id: 0,
          name: "web全栈开发架构师",
          price: 9998
        },
        {
          id: 1,
          name: "Python人工智能",
          price: 8888
        }
      ],
      courseCarts: []
    };
  },
  methods: {
    // 添加课程到课程列表
    addToLists(course) {
      this.courseLists.push({
        ...course,
        id: this.courseLists[this.courseLists.length - 1].id + 1
      });
    },
    // 添加课程到购物车
    addToCart(index) {
      const course = this.courseCarts.find(
        item => item.id === this.courseLists[index].id
      );
      if (course) {
        course.count += 1;
      } else {
        this.courseCarts.push({
          ...this.courseLists[index],
          count: 1,
          isActive: false,
        });
      }
    },
    // 在购物车添加课程
    courseCartAdd(index) {
      this.courseCarts[index].count += 1;
    },
    // 在购物车减去课程
    courseCartMinus(index) {
      const count = this.courseCarts[index].count
      if (count <= 1) {
        if (window.confirm("确定要从购物车移除该项吗")) {
          this.courseCarts.splice(index, 1)
        }
      } else {
          this.courseCarts[index].count -= 1
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>