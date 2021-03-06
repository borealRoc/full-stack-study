# vue原理
1. vue1.0响应式原理[没有vdom和diff算法]
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
        - 1.4.1 初始化：解析[编译]指令，初始化视图(update)
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
2. vue2.0原理
    - 2.1 目录结构<https://www.cnblogs.com/yimeidan/p/10594620.html>
        - .circleci: 包含CircleCI持续集成/持续部署工具的配置文件
        - .github: 项目相关的说明文档
        - benchmarks: 基准,性能测试文件，Vue的跑分demo，比如大数据量的table或者渲染大量SVG
        - dist: 构建后输出的不同版本的Vue（UMD, CommonJS, ES 生产和开发包）
            - runtime：仅包含运行时，不包含编译器
            - common：cjs规范，用于webpack1
            - esm：ES模块，用于webpack2+
            - browser：直接用于浏览器
        - example: 用Vue写的一些Demo
        - flow: Vue使用Flow进行进行静态类型检查，这个flow文件夹是静态类型检查类型声明文件
        - script: 项目配置文件，结合webpack, rollup进行编译、测试、构建等操作
            - alias.js: 模块别名
            - config.js: 包含在'dist/'中找到的所有文件的生成配置[在这个文件找Vue源码入口:'web-full-dev']
            - build.js: 对config.js所有的rollup配置进行构建
        - src：主要源码所在位置
            - compiler: 解析模块相关
                - codegen: 把AST转换为render函数
                - directives: 通用生成render函数之前需要处理的指令
                - parser: 解析模板成AST
            - core: Vue核心代码，包括内置组件，全局API封装，Vue实例化，观察者，虚拟DOM...
                - components: 组件相关属性, 主要是keep-alive
                - global-api: 全局API，如Vue.use, Vue.extend, Vue.mixin...
                - instance: Vue构造函数，以及Vue实例化相关的内容，如state, 生命周期，事件...
                - observer: 响应式，双向数据绑定
                - util: 工具方法
                - vdom：虚拟DOM的创建和打补丁
            - platforms：跨平台相关
                - web: web端
                    - compiler: web端编译相关代码，把模板编译成render函数
                    - runtime: web端运行时相关代码，用于创建Vue实例
                    - server: 服务端渲染
                    - util: 相关工具类
                - weex: 基于通用跨平台的 Web 开发语言和开发经验，来构建 Android、iOS 和 Web 应用
            - server: ssr相关
            - sfc: 转换单文件(*.vue)
            - shared: 全局共享的方法和常量
        - test：测试用例
        - types：Vue新版本支持TypeScript，主要是TypeScript类型声明文件
        - .babelrc.js: babel配置
        - .eslintrc.js: eslint配置
        - .flowconfig: flow配置
    - 2.2 入口文件：直接用于浏览器带编译器的完整版`src/platforms/web/entry-runtime-with-compiler.js`
    - 2.3 Vue初始化
        - (1)扩展$mount，处理el和template选项[处理优先级：render > template > el]
            ```javascript
            // 获取选项
            const options = this.$options
            // 若不存在render选项则将template/el的设置转换为render函数
            if (!options.render) {
                let template = options.template
                if (template) {
                    // 解析template选项
                } else if (el) {
                    // 否则解析el选项
                    template = getOuterHTML(el)
                }
                if (template) {
                    // 编译得到render函数
                    const { render, staticRenderFns } = compileToFunctions(template, {..}, this)
                    options.render = render
                }
            }
            ```
        - (2)web运行时代码
            - （2）- 1 定义$mount:挂载根组件到指定宿主元素
            ```javascript
            Vue.prototype.$mount = function (
                el?: string | Element,
                hydrating?: boolean
                ): Component {
                el = el && inBrowser ? query(el) : undefined
                return mountComponent(this, el, hydrating)
            }
            ``` 
            - (2) - 2 定义__patch__:补丁函数，执行patching算法进行更新
            ```javascript
            // install platform patch function
            Vue.prototype.__patch__ = inBrowser ? patch : noop  
            ```
        - (3) 初始化全局API：`initGlobalAPI(Vue)`
        ```javascript
        Vue.set = set //向响应式对象添加一个响应式的property
        Vue.delete = del //删除对象的 property。如果对象是响应式的，删除能触发更新视图
        Vue.nextTick = nextTick //在下次 DOM 更新循环结束之后执行延迟回调
        initUse(Vue) // 实现Vue.use函数, 安装 Vue.js 插件
        initMixin(Vue) // 实现Vue.mixin函数, 混入
        initExtend(Vue) // 实现Vue.extend函数, 使用基础 Vue 构造器，创建一个“子类”
        /**
         * Vue.component: 注册或获取全局组件
         * Vue.directive: 注册或获取全局指令
         * Vue.filter: 注册或获取全局过滤器
         */
        initAssetRegisters(Vue) // 注册实现Vue.component/directive/filter
        ```
        - (4) Vue构造函数
        ```javascript
        function Vue (options) {
            // 构造函数仅执行了_init
            this._init(options)
        }
        initMixin(Vue) // 实现上面的this._init这个初始化方法 
        /**
        * vm.$data: Vue 实例观察的数据对象。Vue 实例代理了对其 data 对象 property 的访问
        * vm.$prop: 当前组件接收到的 props 对象。Vue 实例代理了对其 props 对象 property 的访问
        * vm.$set: 全局 Vue.set 的别名
        * vm.$delete: 全局 Vue.delete 的别名
        */
        stateMixin(Vue) // 状态相关api $data,$props,$set,$delete,$watch
        /**
        * vm.$on: 监听当前实例上的自定义事件。事件可以由 vm.$emit 触发
        * vm.$emit: 触发当前实例上的事件
        * vm.$once: 监听一个自定义事件，但是只触发一次。一旦触发之后，监听器就会被移除
        * vm.$off: 移除自定义事件监听器
        */
        eventsMixin(Vue) // 事件相关api $on,$once,$off,$emit
        /**
        * vm.$forceUpdata(): 迫使 Vue 实例重新渲染。注意它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件
        * vm.$detory()： 完全销毁一个实例
        */
        lifecycleMixin(Vue) // 生命周期api _update,$forceUpdate,$destroy
        /**
        * vm.$nextTick: 跟全局方法 Vue.nextTick 一样
        */ 
        renderMixin(Vue) // 渲染api _render,$nextTick
        ```
        - （4）- 1 `initMixin(Vue)`: 创建组件实例，初始化其数据、属性、事件等
        ```javascript
        /**
        * vm.$parent: 父实例
        * vm.$root: 根 Vue 实例
        * vm.$children: 当前实例的直接子组件
        * vm.$refs: 一个对象，持有注册过 ref attribute 的所有 DOM 元素和组件实例
        */ 
        initLifecycle(vm) //定义$parent,$root,$children,$refs
        initEvents(vm) // 处理父组件传递的监听器
        /**
        * vm.$slot: 访问被插槽分发的内容
        * vm.$scopedSlots: 访问作用域插槽
        */ 
        initRender(vm) // 定义 $slots,$scopedSlots,vm.$createElement
        callHook(vm, 'beforeCreate') 
        initInjections(vm) // resolve injections before data/props，注入进来的属性也是响应式
        initState(vm) // 初始化组件的状态，包括pros, data, methods, computed, watch等
        initProvide(vm) // resolve provide after data/props
        callHook(vm, 'created')
        ```
    - 2.4 数据响应式[一个组件挂载一个watcher]
        - （1）响应式概要：Vue一大特点是数据响应式，数据的变化会作用于UI而不用进行DOM操作。原理上来讲，是利用了JS语 言特性Object.defineProperty()，通过定义对象属性setter方法拦截对象属性变更，从而将数值的变化 转换为UI的变化。具体实现是在Vue初始化时，会调用initState，它会初始化data，props等，这里着重关注data初始化
        - （2）响应式流程
            - (2)-1 初始化数据
            ```javascript
            // 1. 初始化组件的状态，包括pros, data, methods, computed, watch等
            function initState(vm: Component) {
                initData()
                initProps()
                initComputed()
                initWatch()
                initMethods()
            }
            // 2. 以initData为例, 研究data如何响应化
            function initData(vm: Component) {
                // 执行数据响应化
                let data = vm.$options.data
                observe(data, true /* asRootData */)
                // 代理data到实例上
                const keys = Object.keys(data)
                proxy(vm, `_data`, key)
            }
            ```
            - (2)-2 observe()返回一个Observer实例
            ```javascript
            function observe(value: any, asRootData: ?boolean): Observer | void {
                let ob: Observer | void
                ob = new Observer(value)
                return ob
            }
            ```
            - (2)-3 Observer对象根据数据类型执行相应的响应化操作
            ```javascript
            export class Observer {
                value: any;
                dep: Dep;
                vmCount: number; // number of vms that have this object as root $data
                constructor(value: any) {
                    this.value = value
                    this.dep = new Dep()
                    this.vmCount = 0
                    if (Array.isArray(value)) {
                        // 数组响应化
                        if (hasProto) {
                            //数组存在原型就覆盖其原型
                            protoAugment(value, arrayMethods)
                        } else {
                            //不存在就直接定义拦截方法
                            copyAugment(value, arrayMethods, arrayKeys)
                        }
                    } else {
                        // 对象响应化
                        this.walk(value)
                    }
                }
                /**
                * Walk through all properties and convert them into
                * getter/setters. This method should only be called when
                * value type is Object.
                */
                walk(obj: Object) {
                    const keys = Object.keys(obj)
                    for (let i = 0; i < keys.length; i++) {
                        defineReactive(obj, keys[i])
                    }
                }
                /**
                * Observe a list of Array items.
                */
                observeArray(items: Array<any>) {
                    for (let i = 0, l = items.length; i < l; i++) {
                        observe(items[i])
                    }
                }
            }
            ```
            - (2)-4 defineReactive定义对象属性的getter和setter
            ```javascript
            export function defineReactive (
                obj: Object,
                key: string,
                val: any,
                customSetter?: ?Function,
                shallow?: boolean
                ) {
                // 一个key一个Dep实例
                const dep = new Dep()
                // 递归执行子对象响应化
                let childOb = !shallow && observe(val)
                // 定义当前对象getter/setter
                Object.defineProperty(obj, key, {
                    enumerable: true,
                    configurable: true,
                    get: function reactiveGetter () {
                        // getter负责依赖收集
                        if (Dep.target) {
                            dep.depend()
                            // 若存在子observer，则依赖也追加到子ob
                            if (childOb) {
                                childOb.dep.depend()
                                if (Array.isArray(value)) {
                                    dependArray(value) // 数组需特殊处理
                                }
                            }
                        }
                        return value
                    },
                    set: function reactiveSetter (newVal) {
                        if (newVal === value || (newVal !== newVal && value !== value)) {
                            return
                        }    
                        val = newVal // 更新值
                        childOb = !shallow && observe(newVal) // childOb更新
                        dep.notify() // 通知更新
                    }
                })
            }
            ```
            - (2)-5 Dep管理一组Watcher，Dep关联的值更新时通知其管理的Watcher更新
            ```javascript
            export default class Dep {
                static target: ?Watcher; // 依赖收集时的wacher引用
                subs: Array<Watcher>; // watcher数组
                constructor () {
                    this.subs = [] 
                }
                //添加watcher实例
                addSub (sub: Watcher) {
                    this.subs.push(sub)
                }
                //删除watcher实例
                removeSub (sub: Watcher) {
                    remove(this.subs, sub)
                }
                //watcher和dep相互保存引用
                depend () {
                    if (Dep.target) {
                        Dep.target.addDep(this)
                    }
                }
                notify () {
                    // stabilize the subscriber list first
                    const subs = this.subs.slice()
                    for (let i = 0, l = subs.length; i < l; i++) {
                        subs[i].update()
                    }
                }
            }
            ```
            - (2)-6 Watcher监控一个表达式或关联一个组件更新函数，数值更新则指定回调或更新函数被调用
            ```javascript
            export default class Watcher {
                constructor (
                    vm: Component,
                    expOrFn: string | Function,
                    cb: Function,
                    options?: ?Object,
                    isRenderWatcher?: boolean
                ) {
                    this.vm = vm
                    // 组件保存render watcher
                    if (isRenderWatcher) {
                        vm._watcher = this
                    }
                    // 组件保存非render watcher
                    vm._watchers.push(this)

                    // options...
                    // 将表达式解析为getter函数
                    // 如果是函数则直接指定为getter，那什么时候是函数？
                    // 答案是那些和组件实例对应的Watcher创建时会传递组件更新函数updateComponent
                    if (typeof expOrFn === 'function') {
                        this.getter = expOrFn
                    } else {
                        // 这种是$watch传递进来的表达式，它们需要解析为函数
                        this.getter = parsePath(expOrFn)
                        if (!this.getter) {
                            this.getter = noop
                        }
                    }
                    // 若非延迟watcher，立即调用getter
                    this.value = this.lazy ? undefined : this.get()
                }
                /**
                * 模拟getter, 重新收集依赖re-collect dependencies.
                */
                get () {
                    // Dep.target = this
                    pushTarget(this)
                    let value
                    const vm = this.vm
                    try {
                        // 从组件中获取到value同时触发依赖收集
                        value = this.getter.call(vm, vm)
                    } 
                    catch (e) {} 
                    finally {
                        // deep watching，递归触发深层属性
                        if (this.deep) {
                            traverse(value)
                        }
                        popTarget()
                        this.cleanupDeps()
                    }
                    return value
                }
                addDep (dep: Dep) {
                    const id = dep.id
                    if (!this.newDepIds.has(id)) {
                        // watcher保存dep引用
                        this.newDepIds.add(id)
                        this.newDeps.push(dep)
                        // dep添加watcher
                        if (!this.depIds.has(id)) {
                            dep.addSub(this)
                        }
                    }
                }
                update () {
                    // 更新逻辑
                    if (this.lazy) {
                        this.dirty = true
                    } else if (this.sync) {
                        this.run()
                    } else {
                        //推入队列，下个刷新周期执行批量任务，这是vue异步更新实现的关键
                        queueWatcher(this)
                    }
                }
            }
            function queueWatcher (watcher: Watcher) {
                queue.push(watcher)
                // nextTick将flushSchedulerQueue加入回调数组，启动timerFunc准备执行
                nextTick(flushSchedulerQueue)
            }
            callbacks.push(() => cb.call(ctx))
            // timerFunc指定了vue异步执行策略，根据执行环境，首选Promise，备选依次为:MutationObserver、setImmediate、setTimeout
            timerFunc()
            ```
            - (2)-7 数组响应式：数组比较特别，它的操作方法不会触发setter，需要特别处理
                - 7.1 数组方法打补丁
                ```javascript
                // 数组原型
                const arrayProto = Array.prototype
                // 修改后的原型
                export const arrayMethods = Object.create(arrayProto)
                // 七个待修改方法
                const methodsToPatch = [
                    'push',
                    'pop',
                    'shift',
                    'unshift',
                    'splice',
                    'sort',
                    'reverse'
                ]
                /**
                * 拦截这些方法，额外发送变更通知
                */
                methodsToPatch.forEach(function (method) {
                    // 原始数组方法
                    const original = arrayProto[method]
                    // 修改这些方法的descriptor
                    def(arrayMethods, method, function mutator (...args) {
                        // 原始操作
                        const result = original.apply(this, args)
                        // 获取ob实例用于发送通知
                        const ob = this.__ob__
                        // 三个能新增元素的方法特殊处理
                        let inserted
                        switch (method) {
                            case 'push':
                            case 'unshift':
                                inserted = args
                                break
                            case 'splice':
                                inserted = args.slice(2)
                                break
                        }
                        // 若有新增则做响应处理
                        if (inserted) ob.observeArray(inserted)
                        // 通知更新
                        ob.dep.notify()
                        return result
                    })
                })
                ```
                - 7.2 覆盖数组原型
                ```javascript
                if (Array.isArray(value)) {
                    // 替换数组原型
                    protoAugment(value, arrayMethods) // value.__proto__ = arrayMethods
                    this.observeArray(value)
                }
                ```
                - 7.3 数组响应式的特殊处理
                ```javascript
                observeArray (items: Array<any>) {
                    for (let i = 0, l = items.length; i < l; i++) {
                        observe(items[i])
                    }
                }
                ```
                - 7.4 依赖收集时特殊处理
                ```javascript
                //getter中
                if (Array.isArray(value)) {
                    dependArray(value)
                }
                // 数组中每一项也需要收集依赖
                function dependArray (value: Array<any>) {
                    for (let e, i = 0, l = value.length; i < l; i++) {
                        e = value[i]
                        e && e.__ob__ && e.__ob__.dep.depend()
                        if (Array.isArray(e)) {
                            dependArray(e)
                        }
                    }
                }
                ```
    - 2.5 虚拟DOM
        - 
    - 2.6 编译器
        - 