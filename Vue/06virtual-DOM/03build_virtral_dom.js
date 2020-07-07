const VNodeType = {
    HTML: 'HTML',
    TEXT: 'TEXT',
    // COMPONENT: 'COMPONENT',
}
const ChildType = {
    EMPTY: 'EMPTY',
    SINGLE: 'SINGLE',
    MULTIPLE: 'MULTIPLE',
}

function createElement(tag, data = null, children = null) {
    // 1. 确定flag: 暂时只考虑TEXT和HTML
    let flags
    const type = typeof tag
    if (type === 'string') {
        flags = VNodeType.HTML
    }
    // else if (type === 'function') {
    //     flags = VNodeType.COMPONENT
    // } 
    else {
        flags = VNodeType.TEXT
    }

    // 2. 确定 childFlags
    let childFlags = null
    if (Array.isArray(children)) {
        const { len } = children
        if (len === 0) {
            // 没有子节点
            childFlags = ChildType.EMPTY
        } else {
            // 多个子节点
            childFlags = ChildType.MULTIPLE
        }
    } else if (children === null) {
        // 没有子节点
        childFlags = ChildType.EMPTY
    } else {
        // 其他情况都作为文本节点处理，即单个子节点，会调用 createTextVNode 创建纯文本类型的VNode
        childFlags = ChildType.SINGLE
        children = createTextVNode(children + '')
    }

    // 3. 返回vnode对象
    return {
        flags,
        tag,
        data,
        key: data && data.key,
        children,
        childFlags,
        el: null
    }
}

function createTextVNode(text) {
    return {
        flags: VNodeType.TEXT,
        tag: null,
        data: null,
        // 纯文本类型的 VNode，其 children 属性存储的是与之相符的文本内容
        children: text,
        // 文本节点没有子节点
        childFlags: ChildType.EMPTY
    }
}