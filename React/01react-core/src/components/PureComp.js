// eslint-disable-next-line 
import React, { Component, PureComponent } from 'react'

// 展示组件
// 虽然React组件会很智能地比较组件状态更新与否，从而决定是否去更新DOM，
// 但比较本身就是消耗性能的，即下面Message组件的setInterval会导致List组件不断执行render函数
// function List({ data }) {
//     console.log('render')
//     return (
//         <div>
//             <p>{data.body}</p>
//             <p>----{data.author}</p>
//         </div>
//     )
// }

// 解决方式一
// 如果数据没更新，<list/>组件不需要不断render,但下面这种方式比较笨
// class List extends Component {
//     shouldComponentUpdate(nextProps) {
//         if (nextProps.data.body === this.props.data.body && nextProps.data.author === this.props.data.author) {
//             return false
//         }
//         return true
//     }
//     render() {
//         console.log('render')
//         return (
//             <div>
//                 <p>{this.props.data.body}</p>
//                 <p>----{this.props.data.author}</p>
//             </div>
//         )
//     }
// }

// 解决方式二
// 纯组件
// PureComponent是浅比较，所以传递的属性不要传引用类型，要传值类型
// class List extends PureComponent {
//     render() {
//         console.log('render')
//         return (
//             <div>
//                 <p>{this.props.body}</p>
//                 <p>----{this.props.author}</p>
//             </div>
//         )
//     }
// }

// 解决方式三
// 使用meno高阶组件
const List = React.memo(({ body, author }) => {
    console.log('React.meno--render')
    return (
        <div>
            <p>{body}</p>
            <p>----{author}</p>
        </div>
    )
})

// 容器组件
export default class PureComp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mes: []
        }
    }
    componentDidMount() {
        this.timeId = setInterval(() => {
            this.setState({
                mes: [
                    { body: 'React is very good', author: 'Facebook', },
                    { body: 'Vue is very good', author: 'You', },
                ]
            })
        }, 2000)
    }
    componentWillUnmount() {
        clearInterval(this.timeId)
    }
    render() {
        return (
            <div>
                {/* {this.state.mes.map((item, index) => <List key={index} data={item}/>)} */}
                {/* {this.state.mes.map((item, index) => <List key={index} body={item.body} author={item.author} />)} */}
                {this.state.mes.map((item, index) => <List key={index} {...item} />)}
            </div>
        )
    }
}
