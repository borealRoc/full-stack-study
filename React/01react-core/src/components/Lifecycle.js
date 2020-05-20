import React, { Component } from 'react'

export default class Lifecycle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            counter: 0,
        }
        console.log('执行constructor', this.state.counter)
    }

    changeCounter = () => {
        this.setState({
            counter: this.state.counter + 1
        })
    }

    static getDerivedStateFromProps(props, state) {
        // getDerivedStateFromProps在调用render之前调用
        // 并且在初始挂载及后续更新时都会被调用
        // 它返回一个对象来更新state，如果返回null，则不更新任何内容
        const { counter } = state
        console.log('执行getDerivedStateFromProps', counter)
        return counter < 5 ? null : { counter: 0 }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { counter } = nextState
        console.log('执行shouldComponentUpdate', counter)
        return counter !== 4
    }

    render() {
        console.log('执行render', this.state.counter)
        return (
            <div>
                <p>counter是：{this.state.counter}</p>
                <button onClick={this.changeCounter}>改变counter</button>
            </div>
        )
    }
}
