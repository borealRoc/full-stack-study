import asyncRoutes from '@/router/async-routes'
import constRoutes from '@/router/const-routes'

/**
 * 根据路由meta.role确定是否当前用户拥有访问权限
 * @roles 用户拥有角色
 * @route 待判定路由
 */
function hasPer(roles, route) {
    // 如果当前路由有roles字段则需判断用户访问权限
    if (route.meta && route.meta.roles) {
        // 若用户拥有的角色中有被包含在待判定路由角色表中的则拥有访问权
        return roles.some(role => route.meta.roles.includes(role));
    } else {
        // 没有设置roles则无需判定即可访问
        return true;
    }
}
/**
 * 递归过滤asyncRoutes路由表
 * @routes 待过滤路由表，首次传入的就是asyncRoutes
 * @roles 用户拥有角色
 */
function filterAsyncRoutes(routes, roles) {
    const ret = []
    routes.forEach(route => {
        const tmp = { ...route }
        if (hasPer(roles, tmp)) {
            // 如果存在子路由则递归过滤之
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            ret.push(tmp)
        }
    })
    return ret
}

const state = {
    fullRoutes: [], // 完整路由表
    addedRoutes: [], // 用户可访问的动态路由表
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addedRoutes = routes
        state.fullRoutes = constRoutes.concat(routes)
        console.log('fullRoutes', state.fullRoutes)
    }
}

const actions = {
    // 路由生成：在得到用户角色后会第一时间调用
    generateRoutes({ commit }, roles) {
        return new Promise(resolve => {
            let accessedRoutes;
            // 用户是管理员则拥有完整访问权限
            if (roles.includes("admin")) {
                accessedRoutes = asyncRoutes || [];
            } else {
                // 否则需要根据角色做过滤处理
                console.log('generateRoutes roles', roles)
                accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
            }
            commit("SET_ROUTES", accessedRoutes);
            resolve(accessedRoutes);
        });
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}