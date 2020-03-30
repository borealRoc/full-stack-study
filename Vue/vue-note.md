# Vue的组件机制
1. vue组件传值、通信的方式
    - 父传子：props
    - 子传父：事件
    - 兄弟组件：通过共同的父组件搭桥
    - 祖先和后代：provide && inject
    - 任意组件：事件总线 || Vuex
2. vue插入内容的方式：插槽
    - 匿名插槽
    - 具名插槽
    - 作用域插槽：父组件获取子组件的数据
3. 组件设计——自定义组件
    - 3.1 组件传值，通信和插槽综合运用：模仿Element-UI设计Form表单组件
        - 双向绑定语法糖的实现：:value="val" + @input = "val=e.target.value"
        - Vue两个新增属性：`v-bind="$attrs"` && `inheritAttrs: false`
        - findParent && findChild的实现
        - element-ui的dispatch && broadcast方法 + mixins[混入]
    - 3.2 动态组件实例的创建：设计一个Dialog组件
        - 动态创建组件实例的好处：方便使用，可在任何地方直接调用，不要像文件组件一样得先引入，才能调用
        ```javascriot
            function create(Compment, props) {
                const vm = new Vue({
                    render: h => h(Compment, props)
                }).$mount()
                document.body.appendChild(vm.$el) 
                const comp = vm.$children[0]
                comp.remove = () => {
                    document.body.removeChild(vm.$el)
                    comp.$destroy()
                }
                return comp
            }
        ```
        - new Vue: 创建一个Vue实例
            - Component: 组件实例的根组件
            - render：虚拟DOM的实现
            - h：createElement别名，返回虚拟DOM[VNode]
            - { props }： 传递给Component的参数
            - $mount()： 把上面生成的VNode转化成真是DOM，并挂载到目标节点上，若不指定选择器，会执行转化过程，只是不挂载
        - document.body.appendChild(vm.$el)： 手动挂载
            - vm.$el：真实dom
        - comp.remove：回收，销毁组件
            - vm.$children[0]：获取组件实例
    - 3.3 递归组件: 设计一个Tree组件
        - name选项
        - 递归终止条件 

