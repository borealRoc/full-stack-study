// 手写简版logger
export function logger({ dispatch, getState }) {
    return dispatch => action => {
        // logger中间件的任务
        // 任务1：打印action的名字
        console.log(action.type + '执行了')
        // 任务2：打印 prev state
        console.log('prev state是：' + getState())
        // 任务3：打印 next state
        // 执行完中间件的任务后，再去执行下一个中间件的任务或createStore原本的dispatch任务
        return dispatch(action, () => console.log('next state是：' + getState()))
    }
}