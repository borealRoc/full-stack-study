import { getToken, setToken, removeToken } from "@/utils/auth"

const state = {
    token: getToken(),
    roles: []
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    }
}

const actions = {
    login({ commit }, userInfo) {
        const { username } = userInfo
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (username === 'admin' || username === 'xusp') {
                    // 在store中存入token，值为username
                    commit("SET_TOKEN", username)
                    // 在cookie中存入token,值为username
                    setToken(username)
                    resolve()
                } else {
                    reject('用户名或密码错误')
                }
            }, 1000)
        })
    },

    getInfo({commit, state}) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const roles = state.token === 'admin'? ['admin']: ['editor']
                commit('SET_ROLES', roles)
                resolve({roles})
            }, 1000)
        })
    },

    resetToken({commit}) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
