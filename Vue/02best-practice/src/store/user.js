import { getToken, setToken, removeToken } from "@/utils/auth"

const state = {
    token: getToken(),
    roles: []
}

const mutations = {
    SET_TOKEN: (state, token) => state.token = token,
    SET_ROLES: (state, roles) => state.roles = roles,
}

const actions = {
    // 获取令牌
    login({ commit }, userInfo) {
        const { username } = userInfo
        if (username === 'admin' || username === 'xusp') {
            commit('SET_TOKEN', username)
            setToken(username)
            return true
        } else {
            return false
        }
    },
    // 根据令牌获取用户角色
    getInfo({ commit, state }) {
        const roles = state.token === 'admin' ? ['admin'] : ['editor']
        console.log('user.js -- roles', roles)
        commit('SET_ROLES', roles)
        return roles
    },
    // 注销用户
    resetToken({ commit }) {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', '')
        removeToken()
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}