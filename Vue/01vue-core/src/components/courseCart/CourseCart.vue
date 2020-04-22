<template>
  <div class="course-cart-comp">
    <h4>{{courseCartTitle}}</h4>
    <table v-if="courseCarts.length > 0">
      <thead>
        <tr>
          <th>勾选</th>
          <th>课程名称</th>
          <th>课程价格</th>
          <th>数量</th>
          <th>价格</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(courseCart, index) in courseCarts"
          :key="index"
          :class="{active: courseCart.isActive}"
        >
          <td>
            <input type="checkbox" v-model="courseCart.isActive" />
          </td>
          <td>{{courseCart.name}}</td>
          <td>{{courseCart.price}}</td>
          <td>
            <button @click="minus(index)">-</button>
            {{courseCart.count}}
            <button @click="add(index)">+</button>
          </td>
          <td>{{courseCart.price * courseCart.count}}</td>
        </tr>
        <tr>
          <td>结算</td>
          <td colspan="2">{{activeCartsLen}}/{{totalCartsLen}}</td>
          <td colspan="2">{{totalPrice}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "CourseCart",
  inject: ['courseCartTitle'],
  props: ["courseCarts"],
  methods: {
    minus(index) {
      this.$emit("courseCartMinus", index);
    },
    add(index) {
      this.$emit("courseCartAdd", index);
    }
  },
  computed: {
    activeCartsLen() {
      return this.courseCarts.filter(item => item.isActive === true).length;
    },
    totalCartsLen() {
        return this.courseCarts.length
    },
    totalPrice() {
        let total = 0
        this.courseCarts.forEach(item => {
            if (item.isActive) {
                total += item.price * item.count
            }
        })
        return total
    }
  }
};
</script>

<style>
tr.active {
  color: green;
}
</style>