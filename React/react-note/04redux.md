# react全家桶 -- Redux
1. reducer: reducer是一个纯函数，接收旧的state和action，返回新的state
    - `(preState, action) => newState`
2. reduce: 之所以将这样的函数称之为 reducer, 是因为这种函数与被传入`Array.prototype.reduce(reducer, ？initialVal)`里的回调函数属于相同的类型
    - eg: `const arr = [1,2,3,4]; const reducer = (pre, next) => pre + next; arr.reduce(reducer, 20); //30`
3. redux: Redux是**JavaScript**应用的状态容器，而不单单是React应用的状态容器
    - 3.1 创建store
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
    - 3.2 使用store
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
        - 4.1.2 使用 react-redux 的 Provider API 全局提供 store
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
        - 4.1.3 使用 react-redux 的 connect API 获取状态数据
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