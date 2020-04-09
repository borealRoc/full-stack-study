class XVue {
    constructor(opts) {
        this.$opts = opts
        // 处理data选项
        this.$data = opts.data
        // 1 拦截并监听data中的所有属性
        this.observe(this.$data)
        // 在vue实例创建后就要开始执行首次编译
        new Compile(opts.el, this)

        // 执行created
        if (opts.created) {
            opts.created.call(this)
        }
    }
    // 1 拦截并监听data中的所有属性
    observe(dataObj) {
        // this.$data必须为对象，不考虑函数形式
        if (!dataObj || typeof dataObj !== 'object') return;
        // 1.1 遍历data中的所有属性
        Object.keys(dataObj).forEach(key => {
            // 1.2 为data中的所有属性设立响应式
            this.defineReactive(dataObj, key, dataObj[key])
            // 4.1 把this.$data.key代理到this.key上
            this.provyData(key)
        })
    }
    // 1.2 为data中的所有属性设立响应式
    defineReactive(obj, key, val) {
        // 递归
        this.observe(val)
        // 2.1  一个data中的key对应一个Dep
        const dep = new Dep()
        Object.defineProperty(obj, key, {
            get() {
                // 2.2 一个页面中对data的key的引用对应一个Watcher 
                // 将Dep.target添加到dep中
                Dep.target && dep.addDep(Dep.target)
                return val
            },
            set(newVal) {
                if (newVal !== val) {
                    val = newVal
                    // 2.3 执行每一个Watcher的update方法
                    dep.notify()
                }
            }
        })
    }
    // 4. 代理data对象
    provyData(key) {
        Object.defineProperty(this, key, {
            get() {
                return this.$data[key]
            },
            set(newVal) {
                this.$data[key] = newVal
            }
        })
    }
}
// 2. 收集依赖: 一个data中的key对应一个Dep
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

// 3. 通知更新：一个页面中对data的key的引用对应一个Watcher[一个Dep数组可能有多个同名的Watcher]
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