# vuex
1. 核心概念
    - 仓库[store]：一个容器，包含着应用中大部分的状态 (state)
    - 状态[state]
        - 单一状态树，一个对象就包含了全部的应用层级状态，即它作为一个“唯一数据源”而存在，这意味着，每个应用将仅仅包含一个 store 实例。单状态树和模块化并不冲突。
        - 使用 Vuex 并不意味着所有的状态放入 Vuex，如果有些状态严格属于单个组件，最好还是作为组件的局部状态。
    - 计算属性[getter]
    - 更改store中的状态[mutations]&&[actions]
        - mutations:（1）直接变更状态（2）必须是同步事务
        ```javascript
        // store.js
        mutations() {
            addCount(state, n) {
                state.count += n;
            },
        },
        // views
        this.$store.commit('addCount', 1)
        ```
        - actions:（1）提交的是 mutation，而不是直接变更状态（2）可以包含任意异步操作
        ```javascript
        // store.js
        actions () {
            addNumAsync({commit},n) {
                setTimeout(()=>{
                    commit('addCount',n);
                },1000)
            }
        }
        // views
        this.$store.dispatch('addNumAsync',1);
        ```
    - 模块[modules]
        - 基本用法
        ```javascript
            // moduleA.js
            const moduleA = {stete: {}, getters: {}, mutations: {}, actions: {}}
            export default {
                namespaced:true,
                state,
                mutations,
                actions
            }
            // moduleB.js
            const moduleB = {stete: {}, getters: {}, mutations: {}, actions: {}}
            export default {
                namespaced:true,
                state,
                mutations,
                actions
            }
            // index.js
            export default new Vuex.Store({
                modules:{
                    A: moduleA,
                    B: moduleB
                }
            })
            //App.vue
            {{$store.state.A.count}}
            {{$store.state.B.count}}
        ```
        - 模块的局部状态
            - 模块的局部状态对象:
                - mutations && getters[第一个参数]: state
                - actions: context.state
            - 根节点状态
                - getters: context.rootState
                - actions: context.rootState
2. vuex原理
    - 2.1 Vuex是一个插件
        - 以`Vue.use(Vuex)`的方式使用
    - 2.2 state,getters, mutations和actions的实现
        - state: 设为Vue的data,实现响应式
        - getters: 只读,不可修改
    - 2.3 commit和dispatch的实现
        - commit的参数是state
        - dispatch的参数是ctx({state, getters, commit, dispatch})
    - 2.4 把store选项混入到Vue原型上