import React, { Component } from 'react'
import State from '../components/State'
import FunState from '../components/FunState'
import Cart from '../components/Cart'
import Lifecycle from '../components/Lifecycle'
import Context from '../components/Context'
import Composition from '../components/Composition'
import HOC from '../components/HOC'
import HOCD from '../components/HOCD'
import Hook from '../components/Hook'
import PureComp from '../components/PureComp'
import AntdForm from '../components/AntdFormV4'
import MyAntdForm from '../components/MyAntdForm'
import MyDialogTest from '../components/MyDialogTest'

export default class Home extends Component {
    render() {
        return (
            <div className="home">
                <ul>
                    <li>
                        <h2>1. 状态管理</h2>
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
                    <li>
                        <h2>4. 跨组件传值 --- Context</h2>
                        <h3>相当于Vue的provide && inject</h3>
                        <Context />
                    </li>
                    <li>
                        <h2>5. 组件复合 -- Composition</h2>
                        <h3>相当于Vue的插槽</h3>
                        <Composition />
                    </li>
                    <li>
                        <h2>6. 高阶组件 -- HOC</h2>
                        <h3>高阶组件是一个工厂函数，它接收一个组件，并返回另一个组件</h3>
                        <p>6.1 高阶组件普通写法链式调用</p>
                        <HOC stage="链式调用" />
                        <p>6.2 高阶组件装饰器写法</p>
                        <HOCD stage="装饰器写法" />
                    </li>
                    <li>
                        <h2>7. Hook</h2>
                        <h3>在不编写class组件的情况下使用state以及其他的React特性</h3>
                        <Hook />
                    </li>
                    <li>
                        <h2>8. PureComponent: 纯组件</h2>
                        <h3>Component不会比较当前和下个状态的props和state。因此，每当shouldComponentUpdate被调用时，组件默认的会重新渲染。优化：使用纯组件</h3>
                        <PureComp />
                    </li>
                    <li>
                        <h2>9. 使用antd的form组件</h2>
                        <AntdForm />
                    </li>
                    <li>
                        <h2>10. 模仿Antd自定义一个Form表单组件</h2>
                        <h3>运用高阶组件相关知识</h3>
                        <MyAntdForm />
                    </li>
                    <li>
                        <h2>11. 自定义弹窗类组件</h2>
                        <MyDialogTest/>
                    </li>
                </ul>
            </div>
        )
    }
}
