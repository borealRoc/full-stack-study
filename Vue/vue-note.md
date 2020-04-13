# Vue的组件机制
1. vue组件传值、通信的方式
    - 父传子：props
    - 子传父：事件
    - 兄弟组件：通过共同的父组件搭桥
    - 祖先和后代：provide && inject
    - 任意组件：事件总线 || Vuex
2. vue插入内容的方式：插槽
    - 匿名插槽
    - 具名插槽
    - 作用域插槽：父组件获取子组件的数据
3. 组件设计——自定义组件
    - 3.1 组件传值，通信和插槽综合运用：模仿Element-UI设计Form表单组件
        - 双向绑定语法糖的实现：:value="val" + @input = "val=e.target.value"
        - Vue两个新增属性：`v-bind="$attrs"` && `inheritAttrs: false`
        - findParent && findChild的实现
        - element-ui的dispatch && broadcast方法 + mixins[混入]
    - 3.2 动态组件实例的创建：设计一个Dialog组件
        - 动态创建组件实例的好处：方便使用，可在任何地方直接调用，不必像文件组件一样得先引入，才能调用
        ```javascriot
            function create(Compment, props) {
                const vm = new Vue({
                    render: h => h(Compment, props)
                }).$mount()
                document.body.appendChild(vm.$el) 
                const comp = vm.$children[0]
                comp.remove = () => {
                    document.body.removeChild(vm.$el)
                    comp.$destroy()
                }
                return comp
            }
        ```
        - new Vue: 创建一个Vue实例
            - Component: 组件实例的根组件
            - render：虚拟DOM的实现
            - h：createElement别名，返回虚拟DOM[VNode]
            - { props }： 传递给Component的参数
            - $mount()： 把上面生成的VNode转化成真是DOM，并挂载到目标节点上，若不指定选择器，会执行转化过程，只是不挂载
        - document.body.appendChild(vm.$el)： 手动挂载
            - vm.$el：真实dom
        - comp.remove：回收，销毁组件
            - vm.$children[0]：获取组件实例
    - 3.3 递归组件: 设计一个Tree组件
        - name选项
        - 递归终止条件 
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
# Vue
1. vue1.0[没有虚拟dom和diff算法]的原理
    - 1.1 Observer：劫持监听所有属性
    ```javascript
        const dep = new Dep()
        Object.defineProperty(obj, key, {
            get() {
                Dep.target && dep.addDep(Dep.target)
                return val
            },
            set(newVal) {
                if (newVal !== val) {
                    val = newVal
                    dep.notify()
                }
            }
        })
    ```
    - 1.2 Dep: 一个data中的key对应一个Dep
    ```javascript
    class Dep {
        constructor() {
            this.deps = []
        }
        addDep(dep) {
            this.deps.push(dep)
        }
        notify() {
            this.deps.forEach(dep => dep.update())
        }
    }
    ```
    - 1.3 Watcher: 一个页面中对data的key的引用对应一个Watcher[一个Dep数组可能有多个同名的Watcher]
    ```javascript
    class Watcher {
        constructor(vm, key, cb) {
            this.vm = vm
            this.key = key
            this.cb = cb
            // 将当前watcher实例指定到Dep静态属性target
            Dep.target = this
            // 触发getter，添加依赖
            this.vm[this.key]
            // 回收
            Dep.target = null
        }
        update() {
            this.cb.call(this.vm, this.vm[this.key])
        }
    }
    ```
    - 1.4 Compile
        - 1.4.1 c初始化：解析[编译]指令，初始化视图(update)
        - 1.4.2 订阅数据变化，update通过`new Watcher()`绑定了更新函数
            - 如果数据有变化，会触发Observer中的set()的`watcher.update()`
            - 然后就会触发Watcher类中的update方法
            - 然后就会执行Watcher类中的update方法传入的回调函数cb[cb是一些对页面进行更新的DOM操作]
        ```javascript
        update(node, vm, exp, dir) {
            let updatrFn = this[dir + "Updater"];
            updatrFn && updatrFn(node, vm[exp]);
            // 依赖收集
            new Watcher(vm, exp, function(value) {
                updatrFn && updatrFn(node, value)
            });
        }
        ```
    1.5 总结：Vue1.0的mvvm模式，是通过对节点的精确定位[一个属性引用对应一个Watcher]，在节点有数据变化时，通过DOM操作对其进行更新，因此不需要虚拟DOM和Diff计算，但也因此，它不适合用来做大型项目[太多Watcher]。Vue2.0为了改正这个缺点，引入了虚拟DOM[一个组件对应一个Watcher]，在页面有数据更新时，通过Diff算法比对前后两个节点树，从而查找到哪些节点进行了更新，这些更新，会在新的虚拟DOM完成，再一次性插入到页面中,大大减少了页面重排重绘。从算法复杂度的来分析两者的性能差异，Vue2.0相较于1.0，是用空间在换时间。
2. vue2.0的原理
    - 2.1 生命周期
    - 2.2 响应式原理
    - 2.3 虚拟DOM和Diff算法
# vue最佳实践
1. 项目配置--vue.config.js
    - webpack-chiin[链式操作]: 修改webpack配置
2. 项目结构
3. 权限控制
    - 路由分为两种：constantRoutes 和 asyncRoutes
3. UI库
    - PC：element-ui
    - Mobile: cube-ui