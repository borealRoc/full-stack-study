export function createStore(reducer) {
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