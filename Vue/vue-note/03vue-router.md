# vue-router
1. vue-router原理
    - 1.1 为什么Vue使用vue-router要执行`Vue.use(VueRouter)`？
        - Vue.use会执行VueRouter的install方法,并把Vue作为参数传给VueRouter[对于其他Vue插件也是]
    - 1.2 `new Vue({router, render: h => h(App)}).$mount('#app')`为什么要在根组件挂载router？
        - VueRouter.install方法中，通过`this.$options.router`判断组件实例中有没有'router'选项，才决定要不要把VueRouter的初始化方法mixin到组件的`beforeCreate`生命周期中，确保VueRouter扩展只在根组执行一次，而不是在每个组件都执行。
    1.3 实现VueRouter插件的步骤
        - 1.3.1 明确VueRouter是一个插件
            - 以`Vue.use(VueRouter)`的方式使用
        - 1.3.2 routes选项解析：生成一个map，把hash和component映射起来
            - 嵌套路由如何实现？
            - 官方通过`matched[deepth]`来找到嵌套路由中需要渲染的组件
        - 1.3.3 监控url上hash变化，响应hash变化，获取并渲染对应组件
            - 在VueRouter引入new Vue,把hash作为data选项中的属性，让Vue的响应式去根据hash的变化渲染对应的component
        - 1.3.4 实现两个全局组件：`<router-link>`和`<router-view>`
            - JSX写法在打包时通过babel-loader[vue-cli3有集成babel-loader]编译成h()写法