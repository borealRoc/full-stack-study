import { constRoutes, asyncRoutes } from "@/router";

/**
 * 根据路由meta.role确定当前用户是否拥有访问权限
 * @roles 用户拥有角色
 * @route 待判定路由
 */
function hasPermission(roles, route) {
    // 如果当前路由有roles字段则需判断用户访问权限
    if (route.meta && route.meta.roles) {
        // 若用户拥有的角色中有被包含在待判定路由角色表中的则拥有访问权
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        // 没有设置roles则无需判定即可访问
        return true
    }
}

/**
 * 递归过滤AsyncRoutes路由表
 * @routes 待过滤路由表，首次传入的就是AsyncRoutes
 * @roles 用户拥有角色
 */
export function filterAsyncRoutes(routes, roles) {
    const res = []
    routes.forEach(route => {
        // 复制一份
        const tmp = {...route}
        // 如果用户有访问权则加入结果路由表
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                // 如果存在子路由则递归过滤之
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(tmp)
        }
    })
}

const state = {
    routes: [], //完整路由表
    addRoutes: [], // 用户可访问路由表
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes
        state.routes = constRoutes.concat(routes)
    }
}

const actions = {
    // 路由生成：在得到用户角色后会第一时间调用
    generateRoutes({ commit }, roles) {
        return new Promise(resolve => {
            let accessdRoutes
            if (roles.includes('admin')) {
                // 用户是管理员则拥有完整访问权限
                accessdRoutes = asyncRoutes || []
            } else {
                // 否则需要根据角色做过滤处理
                accessdRoutes = filterAsyncRoutes(asyncRoutes, roles)
            }
            commit('SET_ROUTES', accessdRoutes)
            resolve(accessdRoutes)            
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}