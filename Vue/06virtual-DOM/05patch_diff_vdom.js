// 更新函数
function patch(prev, next, ctn) {
    const nextFlag = next.flags
    const prevFlag = prev.flags
    if (nextFlag !== prevFlag) {
        // 比如旧是p，新是div，则直接移除旧节点，挂载新节点
        patchVnode(prev, next, ctn)
    } else if (nextFlag === VNodeType.TEXT) {
        // 只有文本更新
        patchText(prev, next)
    } else if (nextFlag === VNodeType.HTML) {
        // 节点标签不变，但内部更新
        patchElement(prev, next, ctn)
    }
}

// 1. tag标签不同的更新
function patchVnode(prev, next, ctn) {
    ctn.removeChild(prev.el)
    mount(next, ctn)
}
// 2. 文本不同的更新
function patchText(prev, next) {
    const el = (next.el = prev.el)
    if (next.children !== prev.children) {
        el.nodeValue = next.children
    }
}
// 3. 节点标签不变，但内部子元素有变化的更新
function patchElement(prev, next, ctn) {
    // 3.1 tag不同
    if (next.tag !== prev.tag) {
        patchVnode(prev, next, ctn)
    }

    // 3.2 data不同
    const el = (next.el = prev.el)
    const prevData = prev.data
    const nextData = next.data
    // 3.2.1 新data和旧data都有，并且新data有变化
    if (nextData) {
        for (let key in nextData) {
            const prevVal = prevData[key]
            const nextVal = nextData[key]
            patchData(el, key, prevVal, nextVal)
        }
    }
    // 3.2.2 新data没有，旧data有，即删除了data
    if (prevData) {
        for (let key in prevData) {
            const prevVal = prevData[key]
            if (prevVal && !nextData.hasOwnProperty(key)) {
                patchData(el, key, prevVal, null)
            }
        }
    }

    // 3.3 chldren不同
    patchChildren(
        prev.childFlags, // 旧的 VNode 子节点的类型
        next.childFlags, // 新的 VNode 子节点的类型
        prev.children, // 旧的 VNode 子节点
        next.children, // 新的 VNode 子节点
        el, // 当前标签元素，即这些子节点的父节点
    )
}

// 4. vnode.children的diff算法，整个diff算法的精华
function patchChildren(
    prevChildFlags,
    nextChildFlags,
    prevChildren,
    nextChildren,
    ctn
) {
    // 旧：empty，single，multiple
    // 新：empty， single，multiple
    // 3 * 3 总共9种情况
    // 难点与复杂之处在于 老multiple => 新multiple
    switch (prevChildFlags) {
        // 1 老empty => 
        case ChildType.EMPTY:
            switch (nextChildFlags) {
                // 1.1 老empty => 新empty
                case ChildType.EMPTY:
                    break
                // 1.2 老empty => 新SINGLE
                case ChildType.SINGLE:
                    // 挂载新SINGLE
                    mount(nextChildren, ctn)
                    break
                // 1.3 老empty => 新multiple
                case ChildType.MULTIPLE:
                    // 挂载新multiple的每一项
                    for (let i = 0; i < nextChildren.length; i++) {
                        mount(nextChildren[i], ctn)
                    }
                    break
            }
            break
        // 2 老single => 
        case ChildType.SINGLE:
            switch (nextChildFlags) {
                // 2.1 老single => 新empty
                case ChildType.EMPTY:
                    // 把老single移除
                    ctn.removeChild(prevChildren.el)
                    break
                // 2.2 老single => 新SINGLE
                case ChildType.SINGLE:
                    // 更新老single => 新SINGLE
                    patch(prevChildren, nextChildren, ctn)
                    break
                // 2.3 老single => 新multiple
                case ChildType.MULTIPLE:
                    // 把老single移除，再挂载新multiple每一项
                    ctn.removeChild(prevChildren.el)
                    for (let i = 0; i < nextChildren.length; i++) {
                        mount(nextChildren[i], ctn)
                    }
                    break
            }
            break
        // 3 老multiple => 
        default:
            switch (nextChildFlags) {
                // 3.1 老multiple => 新empty
                case ChildType.EMPTY:
                    // 把老multiple的每一项删除
                    for (let i = 0; i < prevChildren.length; i++) {
                        ctn.removeChild(prevChildren[i].el)
                    }
                    break
                // 3.2 老multiple => 新SINGLE
                case ChildType.SINGLE:
                    // 把老multiple的每一项删除，再挂载新SINGLE
                    for (let i = 0; i < prevChildren.length; i++) {
                        ctn.removeChild(prevChildren[i].el)
                    }
                    mount(nextChildren, ctn)
                    break
                // 3.3 老multiple => 新multiple
                // 众多虚拟DOm，就在这里进行区分，各家优化策略不一样
                // 以下用的是根据“相对位置”来判断的算法
                case ChildType.MULTIPLE:
                    // [a,b,c] => [d,b,a,c]
                    // 第0次：lastIndex =0 [d]
                    // 第1次：lastIndex = 1 [d,b,]
                    // 第2次：lastIndex = 1 [d,b,a]
                    // 第3次：lastIndex = 1 [d,a,b,c]
                    let lastIndex = 0
                    for (let i = 0; i < nextChildren.length; i++) {
                        const nextNode = nextChildren[i]
                        let find = false, j = 0;
                        for (j; j < prevChildren.length; j++) {
                            const prevNode = prevChildren[j]
                            // 3.3.1 老multiple的每一项在新multiple都存在
                            // 列表循环写key的重要性
                            if (nextNode.key === prevNode.key) {
                                find = true
                                patch(prevNode, nextNode, ctn)
                                if (j < lastIndex) {
                                    // 需要移动
                                    const refNode = nextChildren[i - 1].el.nextSibling
                                    ctn.insertBefore(prevNode.el, refNode)
                                    break
                                } else {
                                    // 更新lastIndex
                                    lastIndex = j
                                }
                            }
                        }
                        // 3.3.2 新multiple多了一些老multiple没有的项
                        if (!find) {
                            const refNode = i - 1 < 0 ? prevChildren[0].el : nextChildren[i - 1].el.nextSibling
                            mount(nextNode, ctn, refNode)
                        }
                    }
                    // 3.3.3 移除已经不存在的节点
                    for (let i = 0; i < prevChildren.length; i++) {
                        const prevNode = prevChildren[i]
                        // 列表循环写key的重要性
                        const has = nextChildren.find(nextNode => nextNode.key === prevNode.key)
                        if (!has) {
                            ctn.removeChild(prevNode.el)
                        }
                    }
                    break
            }
            break
    }
}