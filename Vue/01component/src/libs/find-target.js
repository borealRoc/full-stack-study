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