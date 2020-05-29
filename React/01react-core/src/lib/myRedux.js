export function createStore(reducer, enhancer) {
    // 中间件
    if (enhancer) {
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
    function dispatch(action) {
        currentState = reducer(currentState, action)
        subListeners.forEach(sub => sub())
        return action
    }

    dispatch({ type: 'DODEFAULT' })
    return {
        getState,
        dispatch,
        subscribe,
    }
}

// 中间件实现，核心任务是实现函数序列执行
function compose(...fns) {
    if (fns.length === 0) return arg => arg
    if (fns.length === 1) return fns[0]
    return fns.reduce((pre, next) => (...args) => next(pre(...args)))
}
export function applyMiddleware(...mids) {
    // 返回强化以后的createStore
    return createStore => (...args) => {
        // 初始的createStore
        const store = createStore(...args)
        // 初始的dispatch
        let dispatch = store.dispatch

        // 让中间件可以获取状态值，派发action
        const midAPI = {
            getState: store.getState,
            dispatch: (...args) => dispatch(...args)
        }
        const midChains = mids.map(mid => mid(midAPI))
        // 经过中间件加强后的dispatch
        dispatch = compose(...midChains)(store.dispatch)
        return {
            ...store,
            dispatch
        }
    }
}