import Vue from 'vue'
import VueRouter from 'vue-router'
import Course from '../views/Course'
import UseMyForm from '../views/UseMyForm'
import UseTree from '../views/UseTree'

Vue.use(VueRouter)

const routes = [
  {
    path: '/course',
    name: 'course',
    component: Course
  },
  {
    path: '/popup',
    name: 'popup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Popup.vue')
  },
  {
    path: '/useMyForm',
    name: 'useMyForm',
    component: UseMyForm,
  },
  {
    path: '/useTree',
    name: 'useTree',
    component: UseTree,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
