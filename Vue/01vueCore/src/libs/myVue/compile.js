class Compile {
    constructor(el, vm) {
        // 1. 获取DOM
        this.$el = document.querySelector(el)
        this.$vm = vm
        if (this.$el) {
            // 提取宿主中模板内容到Fragment标签，dom操作会提⾼效率
            this.$fragment = this.node2Fragment(this.$el)
            // 编译模板内容，同时进⾏依赖收集
            this.compile(this.$fragment)
            // 把编译好的内容插入到根节点元素中
            this.$el.appendChild(this.$fragment)
        }
    }
    node2Fragment(el) {
        const fragment = document.createDocumentFragment()
        let child
        while ((child = el.firstChild)) {
            fragment.appendChild(child)
        }
        return fragment
    }
    compile(el) {
        // 2. 遍历子元素
        const childNodes = el.childNodes
        Array.from(childNodes).forEach(node => {
            // 3. 判断节点类型并执行响应的编译方法
            if(this.isElement(node)) {
                // 3.1 元素节点，查找x-, @
                const nodeAttrs = node.attributes
                Array.from(nodeAttrs).forEach(attr => {
                    const attrName = attr.name //属性名
                    const attrVal = attr.value //属性值
                    if (this.isDirective(attrName)) {
                        // 3.3 如果是指令: x-text,x-html,x-model
                        const dir = attrName.substring(2)
                        this['compile' + dir] && this['compile' + dir](node, this.$vm, attrVal)
                    }
                    if (this.isEvent(attrName)) {
                        // 3.4 如果是事件@
                        const dir = attrName.substring(1)
                        this.compileevent(node, this.$vm, attrVal, dir)
                    }
                })
            } else if (this.isInterpolation(node)) {
                // 3.2 插值文本{{xxx}}节点
                this.compileInterpolation(node)
            }
            // 递归子节点
            if (node.childNodes && node.childNodes.length > 0) {
                this.compile(node)
            }
        })
    }
    // 3. 判断节点类型
    // 3.1 元素节点
    isElement(node) {
        return node.nodeType === 1
    }
    // 3.2 插值文本{{xxx}}节点
    isInterpolation(node) {
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }
    // 3.3 指令
    isDirective(attr) {
        return attr.indexOf('x-') === 0
    }
    // 3.4 事件
    isEvent(attr) {
        return attr.indexOf('@') === 0
    }

    // 4. 不同类型节点的编译方法
    // 4.1 编译插值文本{{}}
    compileInterpolation(node) {
        const exp = RegExp.$1
        this.update(node, this.$vm, exp, 'text')
    }
    // 4.2 编译指令x-text
    compiletext(node, vm ,dataKey) {
        this.update(node, vm, dataKey, 'text')
    }
    // 4.3 编译指令x-html
    compilehtml(node, vm, dataKey) {
        this.update(node, vm, dataKey, 'html')
    }
    // 4.3 编译指令x-model
    compilemodel(node, vm, dataKey) {
        // 指定input的value属性
        this.update(node, vm, dataKey, 'model')
        // 视图对模型响应:双向绑定
        node.addEventListener("input", e => {
            vm[dataKey] = e.target.value
        })
    }
    // 4.4 编译事件@
    compileevent(node, vm, dataKey, dir) {
        let fn = vm.$opts.methods && vm.$opts.methods[dataKey]
        if (dir && fn) {
            node.addEventListener(dir, fn.bind(vm))
        }
    }

    // 5. 公共的更新方法
    update(node, vm, dataKey, dir) {
        const updateFn = this[dir + 'Update']
        // 初始化
        updateFn && updateFn(node, vm[dataKey])
        // 依赖收集，即当data变化，更新视图
        new Watcher(vm, dataKey, function(newVal) {
            updateFn && updateFn(node, newVal)
        })
    }
    // 6. 不同类型节点的渲染方法
    // 6.1 文本节点
    textUpdate(node, val) {
        node.textContent = val
    }
    // 6.2 html节点x-html
    htmlUpdate(node, val) {
        node.innerHTML = val
    }
    // 6.3 双向数据绑定
    modelUpdate(node, val) {
        node.value = val
    }
}