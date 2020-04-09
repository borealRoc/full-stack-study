// 找到目的父元素
export function findParent(componentName, $this) {
    let parent = $this.$parent || $this.$root
    let name = parent.$options.name
    while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
            name = parent.$options.name
        }
    }
    return parent
}
// 找到目的子元素
export function findChild(componentName, $this) {
    let childArray = []
    let childs = $this.$children
    function innerFindChilds(childs) {
        childs = childs || []
        childs.forEach(item => {
            if (item.$options.name === componentName) {
                childArray.push(item)
            } else {
                innerFindChilds(item.$children)
            }
        })
    }
    innerFindChilds(childs)
    return childArray
}


