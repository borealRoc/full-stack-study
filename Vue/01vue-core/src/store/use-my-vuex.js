import Vue from 'vue'
import MyVuex from '@/libs/my-vuex'

Vue.use(MyVuex)

export default new MyVuex.MyStore({
    state: {
        myCount: 0
    },
    getters: {
        myLeft(state) {
            return 10 - state.myCount
        },

    },
    mutations: {
        myAdd(state) {
            state.myCount += 1
        },
        myRestore(state) {
            state.myCount = 0
        }
    },
    // 动作: 业务逻辑[dispatch]
    actions: {
        myAdd({getters, commit}) {
            if (getters.myLeft > 0) {
                commit('myAdd')
                return true
            }
            return false
        },
        myAsyncAdd({dispatch}) {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(dispatch('myAdd'))
                }, 1000)
            })
        },
        myRestore({commit}) {
            commit('myRestore')
        }
    },
})