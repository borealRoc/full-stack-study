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
}

@connect(mapStateToProps, mapDispatchToProps)
class ReactReduxDemo extends Component {
    render() {
        const { count, add, minus } = this.props
        return (
            <div>
                <p>counter from counterStore: {count}</p>
                <Button onClick={() => add()}>Add</Button>
                <Button onClick={() => minus()}>Minus</Button>
            </div>
        )
    }
}

export default ReactReduxDemo