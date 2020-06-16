# react 官方脚手架：create-react-app
1. 安装：npm install -g create-react-app
2. 创建项目：create-react-app react-core
3. 修改项目的webpack配置：<https://juejin.im/post/5dedd6c8f265da33d15884bf>
    - 3.1 项目 eject
    - 3.2 替换 react-script 包
    - 3.3 使用 react-app-rewired + customize-cra 自定义配置
4. 拓展: yarn<https://www.jianshu.com/p/254794d5e741>
    - Yarn是一个新的 JS 包管理工具 ，它是为了弥补 npm 的一些缺陷而出现的
# react 基础知识
1. React 和 ReactDOM
    - React负责逻辑控制: 数据 -> VDOM：`JSX = React.createElement()`
    - ReactDOM渲染实际DOM: VDOM -> DOM: `ReactDom.render(JSX, #app)`
2. JSX
    - 2.1 条件渲染
        - if 语句
        - 逻辑与 &&
        - 三元表达式
    - 2.2 循环列表 && key
    - 2.3 元素属性：静态值用双引号，动态值用花括号，class与for要特殊处理
        - `<div style={{border: "solid 1px"}}></div>`
        - React样式解决方案
            - style-components
            - styled-jsx
            - classnames
3. function组件和class组件
    - class组件: 通常拥有状态和生命周期，继承于React.Component, 在render()里面return出模板
    - function组件: 通常无状态，仅关注内容展示，直接return出渲染结果
    > React16.8开始引入hooks，函数组件也能够拥有状态
    - 组件注意事项
        - 组件名称必须以大写字母开头，React 会将以小写字母开头的组件视为原生DOM标签
        - return的内容只有一个根节点，需要一个包裹元素。如果不想额外的嵌套，可以使用下面的方式：
            - 数组方式：`return [<h1/>, <p/>]`
            - Fragments: `<React.Fragment><h1/><p/></React.Fragment>`
            - 短语法：`<><h1/><p/></>`
        - props 在父组件中指定，一经指定，不再改变。 对于需要改变的数据，使用state。state状态改变，组件会重新调用render方法，渲染UI.
4. 状态管理
    - class组件: state && setState
        - 维护状态：`this.state = {counter: 0, num: 1}`
        - setState特性
            - 不能直接修改状态
                - `this.state.counter += 1 //error`
                - `this.setState({counter: this.state.counter + 1}) //right`
            - 批量执行
            ```javascript
                this.setState({A: 'aaa', B: 'bbb'})
                this.setState({A: 'aa'})
                console.log(this.state.A, this.state.B) //'aa' 'bbb'
            ```
            - 异步: setState通常是异步的，因此如果要获取到最新状态值有以下三种方式
                - （1）回调函数
                ```javascript
                this.setState((preState, preProps) => ({
                    counter: preState.counter + 1 //1
                }), () => {
                    console.log(this.state.counter) //1
                })
                this.setState((preState, preProps) => ({
                    counter: preState.counter + 1 //2
                }), () => {
                    console.log(this.state.counter) //2
                })
                ```
                - （2）使用定时器
                ```javascript
                setTimeout(() => {
                    this.setState({
                        counter: this.state.counter + 1 //1
                    })
                    console.log(this.state.counter) //1
                    this.setState({
                        counter: this.state.counter + 1 //2
                    })
                    console.log(this.state.counter) //2
                }, 0)
                ```
                - （3）原生事件中修改状态
                ```javascript
                document.getElementById('changeCounter').addEventListener('click', () => {
                    this.setState({
                        counter: this.state.counter + 1 //1
                    })
                    console.log(this.state.counter) //1
                    this.setState({
                        counter: this.state.counter + 1 //2
                    })
                    console.log(this.state.counter) //2
                })
                ```
                > setState只有在合成事件和钩子函数中是异步的，在setState回调函数，原生事件和setTimeout、setInterval中都是同步的？？
    - 函数组件: hooks[useState和useEffect]
5. 事件：绑定this的三种方法
    - 构造函数中绑定并覆盖: `this.change = this.change.bind(this)`
    - 方法定义为箭头函数：`change = () => {}`
    - 事件调用中定义为箭头函数: `onChange = {() => this.change()}`
6. 组件通讯
    - 父传子[props]：单向数据流
    - 子传父[事件，传参]：状态提升
    - 跨层级[context]
    - 任意两个组件通讯[redux]
    - 双向数据绑定
        - 受控组件：`<input type="text">`, `<textarea>` 和 `<select>` 之类的标签都非常相似,它们使用value + onChange事件实现受控组件。文件 `<input type="file"/>` 标签因为它的 value 只读，所以它是 React 中的一个非受控组件
7. 生命周期
    - V16.3之前的生命周期  
    <img src="./img/v16.3.png">
    - V16.4之后的生命周期  
    <img src="./img/v16.4.png">  
    - 总结：
        - `componentWillMount`, `componentWillReceiveProps`和`componentWillUpdate`被`getDerivedStateFromProps`取代
        - `getDerivedStateFromProps`会在render前，初始挂载和后续更新时被调用
# react组件化
1. 组件跨层通信 - context
    - 创建上下文：`const {Provider, Consumer} = React.createContext()`
    - 提供者 -- 哪里提供哪里写: `<Provider value={data}>...</Provider>`
    - 消费者 -- 哪里需要哪里写: `<Consumer>{value => <Comp {...value}/>}</Consumer>`
2. 组件复合 - composition
    - 相当于Vue的插槽: slot => props.children
3. 高阶组件 - HOC
    - 高阶组件是一个工厂函数，传入一个组件，返回另一个组件
    - 装饰器写法：需要配置 -- `npm i @babel/plugin-proposal-decorators -D`
4. Hooks[V16.8~]: Hook本质就是JavaScrip 函数，它可以在不编写class组件的情况下使用state 以及其他的React特性
    - 状态钩子: useState
        - 跟class组件中的`this.state`和`this.setState`类似
            - `const [count, setCount] = useState(0)`等价于class组件中`this.state = {count: 0}, this.setState({count: setCount()})`
    - 副作用钩子: useEffect
        - 它跟class组件中的componentDidMount,componentDidUpdate,componentWillUnmount类似
        - 参数：useEffect(副作用函数，副作用执行依赖项)
        - 清除工作：有一些副作用是需要清除的，清除工作十分重要，可以防止引起内存泄露
    - useReducer: 类似于redux
        - 定义reducer: `const fruitsReducer = (state, action) => {}`
        - 使用: `const [fruits, dispatch] = useReducer(fruitsReducer, ['初始化的水果'])`
    - useContext: 类似于class组件中的Context
        - 借助Context本身和Context.Provider: `const Context = React.createContext()`;`const Provider = Context.Provider`
        - 定义store: `const store = {user: 'xu'}`
        - 使用: `<Provider value={store}></Provider>`;`const {user} = useContext(Context)`
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
            - `react-app-rewired`: 一个对cra进行自定义配置的的社区解决方案
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
# react全家桶 -- Redux
1. reducer: reducer是一个纯函数，接收旧的state和action，返回新的state
    - `(preState, action) => newState`
2. reduce: 之所以将这样的函数称之为 reducer, 是因为这种函数与被传入`Array.prototype.reduce(reducer, ？initialVal)`里的回调函数属于相同的类型
    - eg: `const arr = [1,2,3,4]; const reducer = (pre, next) => pre + next; arr.reduce(reducer, 20); //30`
3. redux: Redux是**JavaScript**应用的状态容器，而不单单是React应用的状态容器
    - 创建store
        - reducer初始化
        - 利用createStore创建store
        ```javascript
        // ./store/redux-counter.js
        const counter = (state:0, action) => {
            switch(action.type) {
                case 'add':
                    return state + 1;
                default: 
                    return state
            }
        }
        export const reduxCounter = createStore(counter)
        ```
    - 使用store
        - getState 获取状态
        - dispatch 提交更新
        - subscribe 订阅更新
        ```javascript
        // ./pages/redux-test.js
        import {reduxCounter} from './store/redux-counter.js'
        export default ReduxTest extends Component {
            componentDidMount() {
                reduxCounter.subscribe(() => this.forceUpdate())
            }
            add() {
                reduxCounter.dispatch({type: 'add'})
            }
            render() {
                const count = reduxCounter.getState()
                //...
            }
        }

        ```
4. react-redux：react-redux是对redux的一层包装，让redux更好服务于React. 
    - 4.1 基本用法
        - 4.1.1 借助redux 的 createStore 创建store
        ```javascript
        // ./store/react-redux-counter.js
        export const counter = (state:0, action) => {
            switch(action.type) {
                case 'add':
                    return state + 1;
                default: 
                    return state
                }
            }
        // ./store/index.js
        import { createStore } from 'redux'
        import { counter } from './react-redux-counter.js'
        export const reactReduxCounter = createStore(counter)
        ```
        - 4.1.2 借助react-redux 的 Provider API 全局提供 store
        ```javascript
        // index.js
        import { store } from './store/index'
        import { Provider } from 'react-redux'
        ReactDOM.render(
            <Provider store = {store}>
                <App/>
            </Provider>,
            document.getElementById('root')
        )
        ```
        - 4.1.3 借助react-redux 的 connect API 获取状态数据
        ```javascript
        // ./actions/react-redux-test.js
        export const add = () => {return {type: 'add'}}
        // ./pages/react-redux-test.js
        import { connect } from 'react-redux'
        import { add } from '../actions/react-redux-test'
        // mapStateToProps: 将store中的数据作为props绑定到组件上
        const mapStateToProps = state => {return {count: state}}
        // mapDispatchToProps: 将dispatch作为props绑定到组件上
        const mapDispatchToProps = {add}
        @connect(mapStateToProps, mapDispatchToProps)
        export default ReactReduxTest extends Component {
            render() {
                const {count, add} = this.props
            }
        }
        ```
    - 4.2 异步：借助`redux-thunk`中间件
    ```javascript
    // ./store/index.js
    import { applyMiddleware } from 'redux'
    import thunk from 'redux-thunk'
    export const reactReduxCounter = createStore(counter, applyMiddleware('thunk'))
    ```
    - 4.3 模块化：combineReducers
    ```javascript
    // ./store/index.js
    import { combineReducers } from 'redux'
    export const reactReduxCounter = createStore(
        // 模块化：使用多个reducer
        combineReducers({ counter1, counter2 }),
        // 使用thunk和logger中间件
        applyMiddleware(thunk, logger))
    ```
5. redux原理
    - 5.1 实现 createStore
        - 存储状态 state
        - 获取状态 getState
        - 更新状态 dispatch
        - 变更订阅 subscribe
    - 5.2 实现 applyMiddleware
        - applyMiddleware是一个高阶函数，它的作用就是扩展createStore原先diapatch的行为
        - 利用js数组的reduce方法实现函数序列的有序执行
6. react-redux原理
# react全家桶 -- react-router
1. 安装
    - 1.1 浏览器版本：`npm i react-router-dom -S`
    - 1.2 Native版本：`npm i react-router-native -S`
2. 用法
    - 2.1 基本用法: 
        - 最外层：`<BrowserRouter>`或`<HashRouter>`
        - 路由链接：`<Link to='/demo'>`
        - 路由视图渲染：`<Route path='/demo' component={Demo}/>`
        - 精确匹配：根路由要添加exact `<Route exact path="/">`
        - 独占路由：`<Switch> ... </Switch>`
    - 2.2 动态路由：
        - `<Link to="/detail/123">`
        - `<Link to="/detail/456">`
        - `<Route path = "/detail/:id">`
    - 2.3 嵌套路由:
        - `<Link to = "/child/child1">`
        - `<Link to = "/child/child2">`
        - `<Route path = "/child/child1">`
        - `<Route path = "/child/child2">`
    - 2.4 404页面: 没有路径，必然匹配，放到最后
        - `<Route component = {() => <div>404</div>}>`
    - 2.5 路由守卫
        - 重定向：`<Redirect to={}/>`
    - 2.6 BrowserRouter vs HashRouter
        - BrowserRouter: history模式
        - HashRouter: hash模式  
        <img src="./img/hashRouter.png"/>
    - 2.7 动态引入 && 基于路由的代码分割
        - React.lazy: `const Home = lazy(() => import('./Home))`
        - Suspense: 在Suspense组件中渲染lazy组件，从而实现在加载lazy组件时做到优雅降级(如loading)
        ```javascript
        <Suspense fallback={<div>...loading</div>}>
            <Route path='/home' component = {Home} />
        </Suspense>
        ```
3. 原理
    - 3.1 实现 BrowserRouter
        - 历史记录管理对象：`this.history = createBrowserHistory(this.props)`
        - 页面location设为state实现变更监听：`this.state = {location: this.history.location}`
        - history和location向下传递: `<RouterProvider value={{history: this.history, location: this.state.location}}>{props.children}</RouterProvider>`
    - 3.2 实现 Route
        - 获取 BrowserRouter 提供的 location 属性：`{location} = useContext(RouterContext)`
        - 路由匹配：`const matchCurrent = props.path === location.pathname`
        - 组件渲染：`{matchCurrent && React.createElement(props.component)}`
    - 3.3 实现 Link
        - 获取 BrowserRouter 提供的 history 属性: `<RouterConsumer>{({history}) => <a onClick={e => linkHandler(e, history)}>{props.children}</a>}</RouterConsumer>`
        - 链接跳转：`<a href={props.to}>`
        - 处理点击事件：阻止a默认的跳转行为, 并把路径push进history对象: `linkHandler = (e, history) => {e.preventDefault(); history.push(props.to)}`
# react VS vue
## 相同点
1. 都是用于创建UI[数据->视图]的JS库
2. 都是用虚拟DOM
3. 都有独立的路由器和状态管理库插件：vue-router + vuex => react-router + react-redux
4. vue借鉴react的一些点
    - 4.1 插槽：slot => 组件复合[props.children]
    - 4.2 组件跨层通信：provide && inject => Context中的 Provide && Consumer
    - 4.3 状态存储store模块化：modules => combineReducers
## 不同点
1. 模板：Vue通常用HTML模板[html,css,js分离]，React全是JS
2. 组件机制：Vue组件分为全局注册和局部注册，react都是通过import，然后直接在任意地方使用
3. react做的事情很少，很多事情交给社区做；vue很多东西都是内置的，写起来方便一点
    - Vue比react多了指令系统，让模板可以实现更丰富的功能，而React只能使用JSX
    - Vue有双向绑定语法糖，React没有
    - Vue有computed和watch，React中需要自己写逻辑实现
# react项目实践
1. redux-saga
2. umi
3. dva
4. 移动端cra


                



