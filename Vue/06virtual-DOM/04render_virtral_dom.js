// 渲染虚拟dom
function render(vnode, ctn) {
    // 区分首次渲染和再次渲染
    if (ctn.vnode) {
        // 再次渲染，更新
        // ctn.vnode: 旧vnode
        // vnode: 新vnode
        patch(ctn.vnode, vnode, ctn)
    } else {
        // 首次渲染，挂载
        mount(vnode, ctn)
    }
    ctn.vnode = vnode
}

// 挂载虚拟dom到节点上
function mount(vnode, ctn, refNode) {
    const { flags } = vnode
    if (flags === VNodeType.HTML) {
        // 挂载普通标签
        mountElement(vnode, ctn, refNode)
    } else if (flags === VNodeType.TEXT) {
        // 挂载纯文本
        mountText(vnode, ctn)
    }
}

// 挂载普通标签
function mountElement(vnode, ctn, refNode) {
    const { tag, data, children, childFlags } = vnode
    const el = document.createElement(tag)
    // 把vnode的el属性赋值为真实节点
    vnode.el = el
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
    refNode ? ctn.insertBefore(el, refNode) : ctn.appendChild(el)
}

// 挂载纯文本
function mountText(vnode, ctn) {
    const { children } = vnode
    const el = document.createTextNode(children)
    vnode.el = el
    ctn.appendChild(el)
}

// 挂载data
function patchData(el, key, pre, next) {
    switch (key) {
        case 'style':
            for (let k in next) {
                el.style[k] = next[k]
            }
            for (let k in pre) {
                if (!next.hasOwnProperty(k)) {
                    el.style[k] = ''
                }
            }
            break
        case 'class':
            el.className = next
            break
        default:
            // 事件
            if (key[0] === '@') {
                // 移除旧事件
                if (pre || !next) {
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