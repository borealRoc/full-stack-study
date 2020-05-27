import React, { Component } from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'

// 状态映射
const mapStateToProps = state => {
    return {
        count: state
    }
}
const mapDispatchToProps = {
    add: () => {
        return { type: 'add' }
    },
    minus: () => {
        return { type: 'minus' }
    },
    asyncAdd: () => dispatch => {
        setTimeout(() => {
            // 异步结束后，手动执行dispatch
            dispatch({type: 'add'})
        }, 1000)
    }
}

@connect(mapStateToProps, mapDispatchToProps)
class ReactReduxDemo extends Component {
    render() {
        const { count, add, minus, asyncAdd } = this.props
        return (
            <div>
                <p>counter from counterStore: {count}</p>
                <Button onClick={() => add()}>Add</Button>
                <Button onClick={() => minus()}>Minus</Button>
                <Button onClick={() => asyncAdd()}>AsyncAdd</Button>
            </div>
        )
    }
}

export default ReactReduxDemo