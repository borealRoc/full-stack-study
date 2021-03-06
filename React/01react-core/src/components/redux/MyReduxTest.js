import React, { Component } from 'react'
import counterStore from '../../store/myReduxStore'
import { Button } from 'antd'

export default class MyReduxTest extends Component {

    componentDidMount() {
        // 订阅redux，在counterStore.getState()变化时重新渲染页面
        counterStore.subscribe(() => {
            this.forceUpdate()
        })
    }

    add() {
        counterStore.dispatch({ type: 'add' })
    }
    minus() {
        counterStore.dispatch({ type: 'minus' })
    }

    asyncAdd() {
        counterStore.dispatch(dispatch => {
            setTimeout(() => {
                dispatch({ type: 'add' })
            }, 1000)
        })
    }

    render() {
        const count = counterStore.getState()
        return (
            <div>
                <p>counter from counterStore: {count}</p>
                <Button onClick={() => this.add()}>Add</Button>
                <Button onClick={() => this.minus()}>Minus</Button>
                <Button onClick={() => this.asyncAdd()}>AsyncAdd</Button>
            </div>
        )
    }
}
