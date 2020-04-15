import router from './index'
import store from '../store'
import whiteList from './white-list'
import { getToken } from '@/utils/auth'


router.beforeEach(async (to, from, next) => {
    const hasToken = getToken()

    if (whiteList.includes(to.path)) {
        // 白名单直接放行
        next()
    } else {
        // 非白名单则判断有没有令牌
        if (hasToken) {
            // 如果有令牌,根据用户角色的访问权限，把对应的动态路由添加至整个路由对象

            // 先获取用户信息
            const roles = await store.dispatch('user/getInfo')
            console.log('roles', roles)
            // 根据用户角色生成动态路由 
            const accessRoutes = await store.dispatch('per/generateRotes', roles)
            // 把动态路由添加至完整路由
            router.addRoutes(accessRoutes)
            // 继续路由跳转
            next()
        } else {
            // Vue.$message("您还未登录，请先登录");
            // 没有令牌,则跳转至登录页面,并将原先要去的页面路径作为redirect参数传过去
            next(`/login?redirect=${to.path}`)
        }
    }
})