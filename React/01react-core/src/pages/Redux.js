import React, { Component } from 'react'
import ReduxDemo from '../components/redux/ReduxDemo'
import ReactReduxDemo from '../components/redux/ReactReduxDemo'
import MyReduxTest from '../components/redux/MyReduxTest'

export default class Redux extends Component {
    render() {
        return (
            <div className="redux-page">
                <h2>Redux是JavaScript应用的状态容器，而不单单是React应用的状态容器</h2>
                <ReduxDemo />
                <h2>react-redux是对redux的一层包装，让redux更好服务于React</h2>
                <ReactReduxDemo />
                <h2>手写简版Redux,redux-logger, redux-thunk</h2>
                <MyReduxTest />
            </div>
        )
    }
}
