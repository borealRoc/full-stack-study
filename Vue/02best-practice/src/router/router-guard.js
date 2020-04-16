import router from './index'
import store from '../store'
import whiteList from './white-list'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'

router.beforeEach(async (to, from, next) => {
    const hasToken = getToken()

    if (hasToken) {
        // 如果有令牌,根据用户角色的访问权限，把对应的动态路由添加至整个路由对象

        // 先获取用户信息
        const hasRoles = store.getters.roles && store.getters.roles.length > 0
        if (hasRoles) {
            // 有角色，则继续
            next()
        } else {
            // 没有角色
            try {
                // 先请求获取用户信息
                const { roles } = await store.dispatch('user/getInfo')
                console.log('router-guard rolse', roles)
                // 根据当前用户角色动态生成路由
                const accessRoutes = await store.dispatch('per/generateRoutes', roles)
                // 然后把动态路由添加至完整路由
                router.addRoutes(accessRoutes)
                // 继续路由切换，确保addRoutes完成
                next({ ...to, replace: true })
            } catch (error) {
                // 出错需重置令牌并重新登录（令牌过期、网络错误等原因）
                await store.dispatch("user/resetToken")
                console.log(error)
                next(`/login?redirect=${to.path}`)
            }
        }
    } else {
        // 没有令牌
        if (whiteList.includes(to.path)) {
            // 白名单直接放行
            next()
        } else {
            // 非白名单则跳转至登录页面,并将原先要去的页面路径作为redirect参数传过去
            next(`/login?redirect=${to.path}`)
        }
    }
})