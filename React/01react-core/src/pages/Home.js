import React, { Component } from 'react'
import State from '../components/State'
import Hook from '../components/Hook'
import Cart from '../components/Cart'
import Lifecycle from '../components/Lifecycle'
import Context from '../components/Context'
import Composition from '../components/Composition'

export default class Home extends Component {
    render() {
        return (
            <div className="Home">
                <ul>
                    <li>
                        <h2>1. 状态管理</h2>
                        <h3>1.1 class组件状态管理: state && setState</h3>
                        <State />
                        <h3>1.2 function组件状态管理: hooks[useState和useEffect]</h3>
                        <Hook />
                    </li>
                    <li>
                        <h2>2. 组件通讯 -- props和事件（参数）</h2>
                        <Cart />
                    </li>
                    <li>
                        <h2>3. 生命周期 -- V16.4~</h2>
                        <Lifecycle />
                    </li>
                    <li>
                        <h2>4. 跨组件传值 --- Context</h2>
                        <p>相当于Vue的provide && inject</p>
                        <Context />
                    </li>
                    <li>
                        <h2>5. 组件复合 -- Composition</h2>
                        <p>相当于Vue的插槽</p>
                        <Composition/>
                    </li>
                </ul>
            </div>
        )
    }
}
