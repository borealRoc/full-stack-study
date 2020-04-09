// vuex模块化
const count = {
    namespaced: true,
    // 状态: 保存数据
    state: {
        count: 0
    },
    // state的计算属性
    getters: {
        left(state) {
            return 10 - state.count
        }
    },
    // 变更: 修改state[commit]
    mutations: {
        add(state) {
            state.count += 1
        },
        restore(state) {
            state.count = 0
        }
    },
    // 动作: 业务逻辑[dispatch]
    actions: {
        add({state, getters, commit, dispatch}) {
                if (getters.left > 0) {
                    commit('add')
                    return true
                }
                return false
        },
        // 异步逻辑修改数据,必须通过actions执行
        asyncAdd({dispatch}) {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(dispatch('add'))
                }, 1000)
            })
        },
        restore({commit}) {
            commit('restore')
        }
    },
}

export default count