import store from "@/store"

const permission = {
    inserted(el, binding) {
        // el: 指令绑定的DOM节点
        // bingding: 指令对象，如{name: 'per', rawName: 'v-per', value: ['admin','editor']}
        const { value: rolesPer } = binding
        const roles = store.getters.roles
        // rolesPer合法性判断
        if (rolesPer && rolesPer instanceof Array && rolesPer.length > 0) {
            const hasPer = roles.some(role => rolesPer.includes(role))
            // 如果没有权限，则把el元素删除
            if (!hasPer) {
                el.parentNode && el.parentNode.removeChild(el)
            }
        } else {
            throw new Error(`需要指定按钮要求角色数组，如v-per="['admin','editor']"`)
        }
    }
}

export default permission