import Vue from 'vue'
import VueRouter from 'vue-router'
import constRoutes from './const-routes'
import './async-routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constRoutes
})

export default router
