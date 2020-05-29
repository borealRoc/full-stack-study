import React, { Component } from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'
import { add, minus, asyncAdd } from '../action/ReactReduxDemo'

// 写法一
// @connect(
//     state => {
//         return {
//             count: state.counter2
//         }
//     },
//     {
//         add: () => {
//             return {type: 'add'}
//         },
//         minus: () => {
//             return {type: 'minus'}
//         },
//         asyncAdd: () => dispatch => {
//             setTimeout(() => {
//                 dispatch({type: 'add'})
//             }, 1000)
//         }
//     }
// )
// 写法二
// @connect(
//     state => {
//         return {
//             count: state.counter2
//         }
//     },
//     {
//         add, minus, asyncAdd
//     }
// )
// 写法三
const mapStateToProps = state => { return { count: state.counter2 } }
const mapDispatchToProps = { add, minus, asyncAdd }
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