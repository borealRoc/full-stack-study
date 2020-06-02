import React, { Component } from 'react'
import State from '../components/basic/State'
import FunState from '../components/basic/FunState'
import Cart from '../components/basic/Cart'
import Lifecycle from '../components/basic/Lifecycle'

export default class Basic extends Component {
    render() {
        return (
            <div className="basic-page">
                <ul>
                    <li>
                        <h2>1 组件状态</h2>
                        <h3>1.1 class组件状态管理: state && setState</h3>
                        <State />
                        <h3>1.2 function组件状态管理: hooks[useState和useEffect]</h3>
                        <FunState />
                    </li>
                    <li>
                        <h2>2. 组件通讯 -- props和事件（参数）</h2>
                        <Cart />
                    </li>
                    <li>
                        <h2>3. 生命周期 -- V16.4~</h2>
                        <Lifecycle />
                    </li>
                </ul>
            </div>
        )
    }
}
