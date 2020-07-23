# react组件化
1. 组件跨层通信 - context
    - 创建上下文：`const {Provider, Consumer} = React.createContext()`
    - 提供者 -- 哪里提供哪里写
    - 消费者 -- 哪里需要哪里写
    ```javascript
    <Provider value={data}>
        <Consumer>
            {value => <Comp {...value} />}
        </Consumer>
    </Provider>
    ```
2. 组件复合 - composition
    - 相当于Vue的插槽: slot => props.children
3. 高阶组件 - HOC
    - 高阶组件是一个工厂函数，传入一个组件，返回另一个组件
    - 装饰器写法：需要配置 -- `npm i @babel/plugin-proposal-decorators -D`
4. Hooks[V16.8~]: Hook本质就是JavaScrip 函数，它可以在不编写class组件的情况下使用state 以及其他的React特性
    - 状态钩子: useState
        - 跟class组件中的`this.state`+`this.setState`类似
            - `const [count, setCount] = useState(0)`等价于class组件中`this.state = {count: 0}, this.setState({count: setCount()})`
    - 副作用钩子: useEffect
        - 它跟class组件中的componentDidMount,componentDidUpdate,componentWillUnmount类似
        - 参数：useEffect(副作用函数，副作用执行依赖项)
        - 清除工作：有一些副作用是需要清除的，清除工作十分重要，可以防止引起内存泄露
    - useReducer: 类似于redux
        - 定义reducer: `const fruitsReducer = (state, action) => {}`
        - 使用: `const [fruits, dispatch] = useReducer(fruitsReducer, ['初始化的水果'])`
    - useContext: 类似于class组件中的Context
        - 借助Context本身和Context.Provider: `const Context = React.createContext(); const Provider = Context.Provider`
        - 定义store: `const store = {user: 'xu'}`
        ```javascript
        <Provider value = {store}>
            <div>
                const {user} = useContext(Context)
            </div>
        </Provider>
        ```
    - 拓展
        - Hook规则：<https://zh-hans.reactjs.org/docs/hooks-rules.html>
        - 自定义Hook
            - <https://zh-hans.reactjs.org/docs/hooks-custom.html>
            - <https://juejin.im/post/5df78ba6f265da33d74428f9>
            - <https://juejin.im/post/5dc953235188250c6c41683e>
        - 一些牛逼的自定义Hook：<https://github.com/streamich/react-use>
        - 2020年了，整理了N个实用案例帮你快速迁移到React Hooks<https://juejin.im/post/5d594ea5518825041301bbcb#heading-1>
5. 使用第三方组件
    - antd
        - 安装：`npm install antd --save`
        - 按需加载配置：`npm install react-app-rewired customize-cra babel-plugin-import -D`
            - `react-app-rewired`: 一个对cra项目进行自定义配置的的社区解决方案
            - `customize-cra`: `react-app-rewired`的依赖
            - `babel-plugin-import`: 按需加载组件代码和样式的babel插件
        ```javascript
        //根目录创建config-overrides.js
        const { override, fixBabelImports, addDecoratorsLegacy } = require("customize-cra");
        module.exports = override(
            fixBabelImports("import", {
                libraryName: "antd",
                libraryDirectory: "es",
                style: "css",
            }),
            addDecoratorsLegacy(), //配置装饰器
        );
        ```
        ```json
        // package.json
        "scripts": {
            "start": "react-app-rewired start",
            "build": "react-app-rewired build",
            "test": "react-app-rewired test",
            "eject": "react-app-rewired eject"
        },
        ```
    > antd v4 对比 antd v3改动了很多
6. 自定义组件
    - 6.1 模仿Antd设计一个表单组件
        - 高阶组件
        - `React.cloneElement`API
        - React表单的双向数据绑定
        - 单项校验和全局校验
    - 6.2 弹窗类组件 -- 传送门Portal, 动态挂载React组件
        - 方案1[v16之后]: `createPortal(comp, node)`
        - 方案2[v16之前]: `unmountComponentAtNode`和`unstable_renderSubtreeIntoContainer`
            - `componentWillUnmount() {unmountComponentAtNode(node)}`
            - `unstable_renderSubtreeIntoContainer(this, comp, node)`
    - 6.3 树形递归组件
        - 可以直接使用组件的名称，递归调用组件
        - 递归终止条件：hasChildren
7. 组件优化技术 -- 纯组件
    - 7.1 shouldComponentUpdate判断
        - Component不会比较当前和下个状态的props和state。因此，每当shouldComponentUpdate被调用时，组件默认的会重新渲染。优化 ——
        - shouldComponentUpdate判断是否更新：`shouldComponentUpdate(nextProps, nextState) { return !(nextProps === this.props && nextState === this.state)}`
        - 缺点：麻烦
    - 7.2 PureComponent[V15.3~]
        - 当props或者state改变时，PureComponent将对props和state进行浅比较，如果一样，则shouldComponentUpdate返回false
        - 缺点：有使用限制
            - 确保数据类型是值类型
            - 如果是引用类型，确保地址不变，同时不应当有深层次的数据变化
            - 必须是class组件
    - 7.3 React.meno()[V16.6~]
        - React.memo()是一个高阶函数，它与 React.PureComponent类似，但它是一个函数组件而非一个类
    - 7.4 vue框架内部已经对此做了优化, 开发者不需要考虑该类问题, 只需要关注自己的应用本身就可以了