import React, { Component } from 'react'
import counterStore from '../../store/index'
import { Button } from 'antd'

export default class ReduxDemo extends Component {

    componentDidMount() {
        // 订阅redux，在counterStore.getState()变化时重新渲染页面
        counterStore.subscribe(() => {
            this.forceUpdate()
        })
    }

    add() {
        counterStore.dispatch({ type: 'c1Add' })
    }
    minus() {
        counterStore.dispatch({ type: 'c1Minus' })
    }

    render() {
        const count = counterStore.getState().counter1
        return (
            <div>
                <p>counter from counterStore: {count}</p>
                <Button onClick={() => this.add()}>Add</Button>
                <Button onClick={() => this.minus()}>Minus</Button>
            </div>
        )
    }
}
