import React, { Component } from 'react'

// 高阶组件是一个函数, 参数是组件，返回新组件
const withName = Comp => {
    console.log('WithName--Comp.name', Comp.name) //HOC
    class NewComp extends Component {
        // 重写组件生命周期
        componentDidMount() {
            console.log('重写组件生命周期')
        }
        render() {
            return  (<Comp {...this.props} name='高阶组件' />)
        }
    }
    return NewComp
}
const withLog = Comp => {
    console.log('withLog--Comp.name', Comp.name) //NewComp
    return props => <Comp {...props}/>
}

// 高阶组件装饰器写法
@withLog
@withName
class HOCD extends Component {
    render() {
        return (
            <div>
            {this.props.stage} -- {this.props.name}
            </div>
        );
    }
}

export default HOCD


