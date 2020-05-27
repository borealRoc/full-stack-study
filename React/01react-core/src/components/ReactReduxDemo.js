import React, { Component } from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'
import {mapStateToProps, mapDispatchToProps} from '../action/ReactReduxDemo'

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