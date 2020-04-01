import Vue from 'vue'
import MyVueRouter from '@/libs/my-router'
import Course from '../views/Course'
import Popup from '../views/Popup'

// 插件注册
Vue.use(MyVueRouter);

export default new MyVueRouter({
  routes: [
      { path: "/course", component: Course }, 
      { path: "/popup", component: Popup }
  ]
});