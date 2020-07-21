# vuex
1. vuex原理
    - 1.1 Vuex是一个插件
        - 以`Vue.use(Vuex)`的方式使用
    - 1.2 state,getters, mutations和actions的实现
        - state: 设为Vue的data,实现响应式
        - getters: 只读,不可修改
    - 1.3 commit和dispatch的实现
        - commit的参数是state
        - dispatch的参数是ctx({state, getters, commit, dispatch})
    - 1.4 把store选项混入到Vue原型上