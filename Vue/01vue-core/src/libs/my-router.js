// 手写简版VueRouter插件
let Vue

class MyVueRouter {
    constructor(opts) {
        this.$opts = opts
        // 创建一个路由path和route映射
        this.routeMap = {}
        // 将来当前路径current需要响应式
        // 利用Vue响应式原理可以做到这一点
        this.app = new Vue({
            data: {
                current: '/'
            }
        })
    }
    // MyVueRouter的初始化方法
    init() {
        // 绑定浏览器事件
        this.bindEvents()
        // 解析路由配置
        this.createRouteMap(this.$opts)
        // 全局注册router-link和router-view
        this.initComponent()
    }
    bindEvents() {
        // bind(this)确保this指向
        window.addEventListener('hashchange', this.onHashChange.bind(this))
        window.addEventListener('load', this.onHashChange.bind(this))
    }
    onHashChange() {
        // http://localhost/#/home
        this.app.current = window.location.hash.slice(1) || '/'
    }
    createRouteMap(opts) {
        // routes: [
        // {
        //     path: '/home',
        //     component: 'Home',
        // }
        // ]
        opts.routes.forEach(item => {
            // ['/home']: {path:'/home',component:Home}
            this.routeMap[item.path] = item.component
        })
        console.log(this.routeMap)
    }
    initComponent() {
        Vue.component('my-router-link', {
            props: {
                to: {
                    type: String,
                    required: true
                },
            },
            render(h) {
                // <a :href="to">xxx</a>
                // h()写法
                return h('a', {attrs: {href: '#' + this.to}}, this.$slots.default)
                // JSX写法
                // return <a href={this.to}>{this.$slots.default}</a>
            }
        })
        // hash改变 -> 通过onHashChange监听，从而赋值current -> current通过Vue具有响应性，它的变化会使得[my-router-view]重新执行render
        Vue.component('my-router-view', {
            // 箭头函数能保留this指向，这里指向VueRouter实例
            render: h => {
                const Comp = this.routeMap[this.app.current]
                return h(Comp)
            }
        })
    }
}
// 把MyVueRouter变为插件
MyVueRouter.install = function (_Vue) {
    Vue = _Vue
    // 混入,扩展Vue
    Vue.mixin({
        beforeCreate() {
            // 这里的代码将来会在外面初始化的时候被调用
            // 这样我们就实现了Vue扩展
            // this是谁？ Vue组件实例
            // 但是这里只希望根组件执行一次
            if (this.$options.myRouter) {
                this.$options.myRouter.init()
            }
        }
    })
}

export default MyVueRouter