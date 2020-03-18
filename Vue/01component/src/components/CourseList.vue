<template>
    <div class="course-lists-comp">
        <h4>课程列表</h4>
        <table>
            <thead>
                <th>课程名称</th>
                <th>课程价格</th>
                <th></th>
            </thead>
            <tbody>
                <tr v-for="(courseList, index) in courseLists" :key="courseList.id">
                    <td>{{courseList.name}}</td>
                    <td>{{courseList.price}}</td>
                    <td><button @click="addToCart(index)">添加到购物车</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'CourseList',
        props: ['courseLists'],
        methods: {
            addToCart(index) {
                this.$emit('addToCart', index)
            }
        },
    }
</script>

<style>
.course-lists-comp {
    margin: 20px 0;
}
</style>