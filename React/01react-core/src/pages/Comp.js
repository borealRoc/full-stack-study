import React, { Component } from 'react'
import Context from '../components/comp/Context'
import Composition from '../components/comp/Composition'
import HOC from '../components/comp/HOC'
import HOCD from '../components/comp/HOCD'
import Hook from '../components/comp/Hook'
import PureComp from '../components/comp/PureComp'
import AntdForm from '../components/comp/AntdFormV4'
import MyAntdForm from '../components/comp/MyAntdForm'
import MyDialogTest from '../components/comp/MyDialogTest'
import Tree from '../components/comp/Tree'
import UseReducer from '../components/comp/UseReducer'

export default class Comp extends Component {
    render() {
        return (
            <div className="comp-page">
                <ul>

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
                        <h4>7.1 以 useSate 方式编写水果组件</h4>
                        <Hook />
                        <h4>7.2 以 useReducer 方式编写水果组件</h4>
                        <UseReducer />
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
                        <MyDialogTest />
                    </li>
                    <li>
                        <h2>12. 递归组件之树形组件</h2>
                        <Tree />
                    </li>
                </ul>
            </div>
        )
    }
}
