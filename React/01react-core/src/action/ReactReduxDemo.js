// 状态映射
export const mapStateToProps = state => {
    return {
        // count: state
        // 模块化
        count: state.counter2
    }
}
// 事件映射
export const mapDispatchToProps = {
    add: () => {
        return { type: 'add' }
    },
    minus: () => {
        return { type: 'minus' }
    },
    asyncAdd: () => dispatch => {
        setTimeout(() => {
            // 异步结束后，手动执行dispatch
            dispatch({ type: 'add' })
        }, 1000)
    }
}