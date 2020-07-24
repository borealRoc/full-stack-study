# react项目实践
1. redux异步方案 - redux-saga
    - 1.1 概述：redux 的一个中间件，用于管理应用程序的副作用（异步获取数据，访问浏览器缓存等）
    - 1.2 使用步骤
        - 1.2.1 UI界面 dispatch 一个 action: `dispatch({type: 'USER_FETCH_REQUESTED', payload: {userId}})`
        - 1.2.2 创建一个 Saga 来监听所有的 USER_FETCH_REQUESTED action, 并触发一个API调用获取用户数据
        ```javascript
        import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
        import Api from '...'
        // worker Saga : 将在 USER_FETCH_REQUESTED action 被 dispatch 时调用
        function* fetchUser(action) {
            try {
                const user = yield call(API.fetchUser, action.paload.userId)
                yield put({type: 'USER_FETCH_SUCCEEDED', user: user})
            } catch (e) {
                yield put({type: 'USER_FETCH_FAILED', message: e.message})
            }
        }
        // 在每个 `USER_FETCH_REQUESTED` action 被 dispatch 时监听、调用 fetchUser 允许并发（译注：即同时处理多个相同的 action）
        function* mySaga() {
            // ‘USER_FETCH_REQUESTED’和 UI界面的action的名字对应
            yield takeEvery('USER_FETCH_REQUESTED', fetchUser)
        }
        /*
            也可以使用 takeLatest
            不允许并发，dispatch 一个 `USER_FETCH_REQUESTED` action 时，
            如果在这之前已经有一个 `USER_FETCH_REQUESTED` action 在处理中，
            那么处理中的 action 会被取消，只会执行当前的
        */
        function* mySaga() {
            yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
        }
        export default mySaga
        ```
    - 1.3 为了能跑起 Saga，使用 redux-saga 中间件将 Saga 与 Redux Store 建立连接
    ```javascript
    import { createStore, applyMiddleware } from 'redux'
    import createSagaMiddleware from 'redux-saga'
    import reducer from './reducers'
    import mySaga from './sagas'
    // create the saga middleware
    const sagaMiddleware = createSagaMiddleware()
    // mount it on the Store
    const store = createStore(
        reducer,
        applyMiddleware(sagaMiddleware)
    )
    // then run the saga
    sagaMiddleware.run(mySaga)
    // render the application
    ```
2. 数据流方案 dva
    - dva 是一个基于 redux 和 redux-saga 的数据流方案，同时还内置了 react-router 和 fetch
3. 企业级应用框架 umi
    - 3.1 依赖层：jest, antd, react, babel@7 webpack@4 dva react-router
    - 3.2 路由
        - 3.2.1 约定式路由
            - 基础路由: `umi g page index`
            - 动态路由页面: `umi g page ./users/[id]`
            - 动态路由目录: `umi g page [post]/index`
            - 嵌套路由: `umi g page ./users/_layout`
            - 全局laoyuts: 手动创建跟pages同级的layouts文件夹
            - 路由守卫：通过指定高阶组件 wrappers 达成效果
        - 3.2.2 配置式路由: 当写了配置式路由，则会忽略约定式路由的所有设置
    - 3.3 配置
    - 3.4 API
    - 3.5 MOCK数据
        - 本地mock：mock文件夹
        - 线上mock：借助mockjs第三方库
4. 移动端cra