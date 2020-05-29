// 手写简版logger
export function logger({ dispatch, getState }) {
    return dispatch => action => {
        // logger中间件的任务
        console.log(action.type + '执行了')
        console.log('prev state是：' + getState())
        // const temFn = () => dispatch(action)
        // temFn()
        console.log('next state是：' + getState())
        // 下一个中间件
        return dispatch(action)
    }
}