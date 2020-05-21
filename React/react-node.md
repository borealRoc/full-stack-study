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
            - 异步: setState通常是异步的，因此如果要获取到最新状态值有以下三种方式[为什么等原理部分再回过头来看]
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
    - 函数组件: hooks[useState和useEffect]
    ```javascript
    const [time, setState] = useState(new Date())
    useEffect(() => {
        const timeId = setInterval(() => {
            setState(new Date())
        }, 1000)
        return () => clearInterval(timeId)
    })
    ```
4. 事件：绑定this的三种方法
    - 构造函数中绑定并覆盖: `this.change = this.change.bind(this)`
    - 方法定义为箭头函数：`change = () => {}`
    - 事件调用中定义为箭头函数: `onChange = {() => this.change()}`
5. 组件通讯
    - 父传子[props]
    - 子传父[事件]
    - 跨层级[context]
    - 任意两个组件通讯[redux]
    - 双向数据绑定
        - 受控组件：`<input type="text">`, `<textarea>` 和 `<select>` 之类的标签都非常相似,它们使用value + onChange事件实现受控组件。文件 `<input type="file"/>` 标签因为它的 value 只读，所以它是 React 中的一个非受控组件
6. 生命周期
    - V16.3之前的生命周期  
    <img src="./img/v16.3.png">
    - V16.4之后的生命周期  
    <img src="./img/v16.4.png">  
# react组件化
1. 组件跨层通信 - context
    - 创建上下文：`const {Provider, Consumer} = React.createContext()`
    - 提供者 -- 哪里提供哪里写: `<Provider value={data}>...</Provider>`
    - 消费者 -- 哪里需要哪里写: `<Consumer>{value => <Comp {...value}/>}</Consumer>`
2. 组件复合 - composition
    - 相当于Vue的插槽: slot => props.children
3. 高阶组件 - HOC
4. Hooks -- V16.8~




                



