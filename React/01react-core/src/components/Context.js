import React, { Component } from 'react'

// 创建上下文
const { Provider, Consumer } = React.createContext()

// 创建需要传递的数据
const store = {
    name: 'xu',
    sayName() {
        console.log(this.name)
    }
}


function Child(props) {
    return (
        <div className="child-comp">
            <p onClick={() => props.sayName()}>My name is {props.name}</p>
        </div>
    )
}

function Middle() {
    return (
        <div className="middle-comp">
            {/* 消费者，接收数据 */}
            {/* 在哪里接收，就在哪里写Consumer */}
            <Consumer>
                {
                    value => <Child {...value} />
                }
            </Consumer>
        </div>
    )
}

function Parent() {
    return (
        <div className="pare-comp">
            <Middle />
        </div>
    )
}

export default class Context extends Component {
    render() {
        return (
            <div className="context-page">
                {/* 提供数据，必须使用value属性  */}
                {/* 在哪里提供，就在哪里写Provider */}
                <Provider value={store}>
                    <Parent />
                </Provider>
            </div>
        )
    }
}
