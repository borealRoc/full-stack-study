// 手写简版VueRouter插件
let Vue

class MyVueRouter {
    constructor(opts) {
        this.$opts = opts
        // 创建一个路由path和component的映射
        this.routeMap = {}
        // 将来当前路径current需要响应式，利用Vue响应式原理可以做到这一点
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
        // 全局注册my-router-link和my-router-view
        this.initComponent()
    }
    bindEvents() {
        // bind(this)确保this指向
        // 路由初始化
        window.addEventListener('load', this.onHashChange.bind(this))
        // 路由跳转
        window.addEventListener('hashchange', this.onHashChange.bind(this))
    }
    onHashChange() {
        // http://localhost/#/home
        this.app.current = window.location.hash.slice(1) || '/'
    }
    createRouteMap(opts) {
        // routes: [
        //     { path: "/home", component: Home }, 
        //     { path: "/about", component: About },
        // ]
        opts.routes.forEach(item => {
            // ['/home']: {path:'/home',component:Home}
            this.routeMap[item.path] = item.component
        })
        console.log('this.routeMap', this.routeMap)
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
                return h('a', { attrs: { href: '#' + this.to } }, this.$slots.default)
                // JSX写法
                // return <a href={this.to}>{this.$slots.default}</a>
            }
        })
        // hash改变 -> 通过onHashChange监听，从而赋值current -> current通过Vue具有响应性，它的变化会使得[my-router-view]重新执行render
        Vue.component('my-router-view', {
            // 箭头函数能保留this指向，这里指向MyVueRouter实例
            render: h => {
                const Comp = this.routeMap[this.app.current]
                return h(Comp)
            }
        })
    }
}
// 把MyVueRouter变为插件
// Vue.use会执行MyVueRouter的install方法,并把Vue作为参数传给MyVueRouter[对于其他Vue插件也是]
MyVueRouter.install = function (_Vue) {
    Vue = _Vue
    // 混入,扩展Vue
    Vue.mixin({
        beforeCreate() {
            // this指向Vue组件实例
            // 确保是根组件时执一次，将MyVueRouter实例放到Vue原型，以后所有组件实例就均有$myRouter
            if (this.$options.myRouter) {
                Vue.prototype.$myRouter = this.$options.myRouter; 
                this.$options.myRouter.init();
            }
        }
    })
}

export default MyVueRouter