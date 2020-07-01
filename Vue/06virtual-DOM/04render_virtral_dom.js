// 渲染虚拟dom
function render(vnode, ctn) {
    // 区分首次渲染和再次渲染
    mount(vnode, ctn)
}

// 挂载虚拟dom到节点上
function mount(vnode, ctn) {
    const { flags } = vnode
    if (flags === VNodeType.HTML) {
        // 挂载普通标签
        mountElement(vnode, ctn)
    } else if (flags === VNodeType.TEXT) {
        // 挂载纯文本
        mountText(vnode, ctn)
    }
}

// 挂载普通标签
function mountElement(vnode, ctn) {
    const { tag, data, children, childFlags } = vnode
    const el = document.createElement(tag)
    // 挂载data
    if (data) {
        for (let key in data) {
            patchData(el, key, null, data[key])
        }
    }
    // 挂载children
    if (childFlags === ChildType.SINGLE) {
        mount(children, el)
    } else if (childFlags === ChildType.MULTIPLE) {
        for (let i = 0; i < children.length; i++) {
            mount(children[i], el)
        }
    }
    ctn.appendChild(el)
}

// 挂载纯文本
function mountText(vnode, ctn) {
    const { children } = vnode
    const el = document.createTextNode(children)
    ctn.appendChild(el)
}
// 挂载data
function patchData(el, key, pre, next) {
    switch (key) {
        case 'style':
            for (let k in next) {
                el.style[k] = next[k]
            }
            break
        case 'class':
            el.className = next
            break
        default:
            // 事件
            if (key[0] === '@') {
                // 移除旧事件
                if (pre) {
                    el.removeEventListener(key.slice(1), pre)
                }
                // 添加新事件
                if (next) {
                    el.addEventListener(key.slice(1), next)
                }
                // 其它attr
            } else {
                el.setAttribute(key, next)
            }
            break
    }
}