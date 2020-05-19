# react 官方脚手架：create-react-app
1. 安装：npm install -g create-react-app
2. 创建项目：create-react-app react-core
# react 基础知识
1. React 和 ReactDOM
    - React负责逻辑控制: 数据 -> VDOM
    - ReactDOM渲染实际DOM: VDOM -> DOM
2. function组件和class组件
    - class组件: 通常拥有状态和生命周期，继承于React.Component实现render方法
    - function组件: 通常无状态，仅关注内容展示，返回渲染结果即可
    > 从React16.8开始引  hooks，函数组件也能够拥有状态
3. 状态管理
    - 类组件: state && setState
        - 维护状态：`this.state({counter: 0})`
        - setState特性
            - 不能直接修改状态：`this.state.counter += 1 //error`
            - 批量执行
            - 异步: setState通常是异步的，因此如果要获取到最新状态值有以下三种方式
                - 传递函数给setState方法
                ```javascript
                this.setState((preState, preProps) => ({
                    counter: preState.counter + 1 //1
                }), () => {
                    console.log(this.state.counter) //1
                })
                this.setState((preState, preProps) => ({
                    counter: preState.counter + 1 //2
                }), () => {
                    console.log(this.state.counter) //2
                })
                ```
                - 使用定时器
                ```javascript
                setTimeout(() => {
                    this.setState({
                        counter: this.state.counter + 1 //1
                    })
                    console.log(this.state.counter) //1
                    this.setState({
                        counter: this.state.counter + 1 //2
                    })
                    console.log(this.state.counter) //2
                }, 0)
                ```
                - 原生事件中修改状态
                ```javascript
                document.getElementById('changeCounter').addEventListener('click', () => {
                    this.setState({
                        counter: this.state.counter + 1 //1
                    })
                    console.log(this.state.counter) //1
                    this.setState({
                        counter: this.state.counter + 1 //2
                    })
                    console.log(this.state.counter) //2
                })
                ```
                > setState只有在合成事件和钩子函数中是异步的，在原生事件和setTimeout、setInterval中都是同步的
    - 函数组件
    


                



