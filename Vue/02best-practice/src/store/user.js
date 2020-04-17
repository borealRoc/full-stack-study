import { getToken, setToken, removeToken } from "@/utils/auth"
import { login, getInfo } from '@/api/user'

const state = {
    token: getToken(),
    roles: []
}

const mutations = {
    SET_TOKEN: (state, token) => state.token = token,
    SET_ROLES: (state, roles) => state.roles = roles,
}

const actions = {
    // 获取并设置令牌
    login({ commit }, userInfo) {
        const { username } = userInfo;
        // return new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         if (username === "admin" || username === "xusp") {
        //             commit("SET_TOKEN", username);
        //             setToken(username);
        //             resolve();
        //         } else {
        //             reject("用户名、密码错误");
        //         }
        //     }, 200);
        // });
        return login(username).then((res) => {
            commit("SET_TOKEN", res.data)
            setToken(res.data)
        });
    },

    // 获取并设置用户角色
    getInfo({ commit, state }) {
        // return new Promise(resolve => {
        //     setTimeout(() => {
        //         const roles = state.token === "admin" ? ["admin"] : ["editor"];
        //         commit("SET_ROLES", roles);
        //         resolve({ roles });
        //     }, 200);
        // });
        return getInfo(state.token).then(({ data: roles }) => {
            commit("SET_ROLES", roles)
            return { roles }
        })
    },

    // 注销用户
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit("SET_TOKEN", "");
            commit("SET_ROLES", []);
            removeToken();
            resolve();
        });
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}