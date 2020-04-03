let Vue

function install(_Vue) {
    Vue = _Vue
    Vue.mixin({
        beforeCreate() {
            // 根组件才把store选项混入到Vue原型上
            if (this.$options.myStore) {
                Vue.prototype.$mystore = this.$options.myStore
            }
        }
    })
}

class MyStore {
    // {
    // state: {count: 1},
    // getters: {left(state) {return 10 - count}},
    // mutations: {add(state) {state.count += 1}},
    // actions: {add({state, getters, commit, dispatch}) {commit('add)}}
    // }
    constructor(opts = {}) {
        this.$opts = opts
        // 利用vue数据响应
        this.state = new Vue({
            data: this.$opts.state
        })
        // 初始化getters, mutations和actions
        this.mutations = this.$opts.mutations || {}
        this.actions = this.$opts.actions || {}
        this.$opts.getters && this.handlerGetters(this.$opts.getters)
    }
    handlerGetters(getters) {
        this.getters = {}
        // 定义只读的属性
        Object.keys(getters).forEach(key => {
            Object.defineProperty(this.getters, key, {
                get: () => {
                    // 执行getters中的方法
                    return getters[key](this.state)
                }
            })
        })
    }
    // 触发mutaions，需要实现commit
    commit = (type, arg) => {
        this.mutations[type](this.state, arg)
    }
    // 触发actions，需要实现dispatch
    dispatch = (type, arg) => {
        this.actions[type](
            // dispatch的参数是ctx({state, getters, commit, dispatch})
            { commit: this.commit, state: this.state, getters: this.getters }, arg
        )
    }
}

export default { MyStore, install }