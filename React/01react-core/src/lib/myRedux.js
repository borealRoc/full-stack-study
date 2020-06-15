export function createStore(reducer, enhancer) {
    // 中间件
    if (enhancer) {
        // enhancer(createStore)执行后返回的是一个增强的createStore,所以后面再传入reducer
        return enhancer(createStore)(reducer)
    }

    // 保存状态
    let currentState = undefined
    // 订阅更新的回调函数
    let subListeners = []

    function getState() {
        return currentState
    }
    function subscribe(cb) {
        subListeners.push(cb)
    }
    function dispatch(action, cb) {
        // 更新状态
        currentState = reducer(currentState, action)
        // 变更通知
        subListeners.forEach(sub => sub())
        // 这里的回调函数cb是为了执行myLogger中获取next state的回调
        cb && typeof cb === 'function' && cb()
        // 为了实现中间件，所以这里返回action
        return action
    }

    // 激活reducer(currentState, {type: 'default'})
    dispatch({ type: 'DOMYREDUXDEFAULT^_^' })
    return {
        getState,
        dispatch,
        subscribe,
    }
}

// 实现函数序列执行
function compose(...fns) {
    if (fns.length === 0) return arg => arg
    if (fns.length === 1) return fns[0]
    return fns.reduce((pre, next) => (...args) => next(pre(...args)))
}

// 中间件的作用就是扩展createStore原先diapatch的行为，这类似于高阶组件的思想，所以applyMiddleware是一个高阶函数（把一个函数作为参数，返回新函数）
export function applyMiddleware(...mids) {
    // 返回强化以后的createStore
    return createStore => (...args) => {
        // ...args是传入createStore的reducer
        // 初始的createStore
        const store = createStore(...args)
        // 初始的dispatch
        let dispatch = store.dispatch

        // 让中间件可以获取状态值，派发action
        const midAPI = {
            // 这里的...args还是上面的reducer
            dispatch: (...args) => dispatch(...args),
            getState: store.getState,
        }
        const midChains = mids.map(mid => mid(midAPI))
        // 经过中间件加强后的dispatch，按顺序执行中间件函数
        dispatch = compose(...midChains)(store.dispatch)
        // 最终返回createStore原先有的东西和增强后的dispatch
        return {
            ...store,
            dispatch
        }
    }
}


