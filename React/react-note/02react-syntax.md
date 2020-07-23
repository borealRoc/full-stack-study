# react 基础知识
1. React 和 ReactDOM
    - React负责逻辑控制: 数据 -> VDOM：`JSX = React.createElement()`
    - ReactDOM渲染真实DOM: VDOM -> DOM: `ReactDom.render(JSX, #app)`
2. JSX
    - 2.1 条件渲染
        - if 语句
        - 逻辑与 &&
        - 三元表达式
    - 2.2 循环列表 && key
    - 2.3 元素属性：静态值用双引号，动态值用花括号，class[className]与for[htmlFor]要特殊处理
        - `<div style={{border: "solid 1px"}}></div>`
        - React样式解决方案
            - style-components
            - styled-jsx
            - classnames
3. function组件和class组件
    - class组件: 通常拥有状态和生命周期，继承于React.Component, 在render()里面return出模板
    - function组件: 通常无状态，仅关注内容展示，直接return出渲染结果
    > React16.8开始引入hooks，函数组件也能够拥有状态
    - 组件注意事项
        - 组件名称必须以大写字母开头，React 会将以小写字母开头的组件视为原生DOM标签
        - return的内容只有一个根节点，需要一个包裹元素。如果不想额外的嵌套，可以使用下面的方式：
            - 数组方式：`return [<h1/>, <p/>]`
            - Fragments: `<React.Fragment><h1/><p/></React.Fragment>`
            - 短语法：`<><h1/><p/></>`
        - props 在父组件中指定，一经指定，不再改变。 对于需要改变的数据，使用state。state状态改变，组件会重新调用render方法，渲染UI.
4. 状态管理
    - class组件: state && setState
        - 维护状态：`this.state = {counter: 0, num: 1}`
        - setState特性
            - 不能直接修改状态
                - `this.state.counter += 1 //error`
                - `this.setState({counter: this.state.counter + 1}) //right`
            - 批量执行
            ```javascript
                this.setState({A: 'aaa', B: 'bbb'})
                this.setState({A: 'aa'})
                console.log(this.state.A, this.state.B) //'aa' 'bbb'
            ```
            - 异步: setState通常是异步的，因此如果要获取到最新状态值有以下三种方式
                - （1）回调函数
                ```javascript
                constructor(props) {
                    super(props)
                    this.state = {
                        counter: 0
                    }
                }
                // 下面两个setState的更新会被合并，所以第一个回调counter也为2
                this.setState((preState, preProps) => ({
                    counter: preState.counter + 1
                }), () => {
                    console.log('1', this.state.counter) //2
                })
                this.setState((preState, preProps) => ({
                    counter: preState.counter + 1
                }), () => {
                    console.log('2', this.state.counter) //2
                })
                ```
                - （2）使用定时器
                ```javascript
                setTimeout(() => {
                    this.setState({
                        counter: this.state.counter + 1
                    })
                    console.log('3', this.state.counter) //3
                    this.setState({
                        counter: this.state.counter + 1
                    })
                    console.log('4', this.state.counter) //4
                }, 0)
                ```
                - （3）原生事件中修改状态
                ```javascript
                document.getElementById('changeCounter').addEventListener('click', () => {
                    this.setState({
                        counter: this.state.counter + 1
                    })
                    console.log('5', this.state.counter) //5
                    this.setState({
                        counter: this.state.counter + 1
                    })
                    console.log('6', this.state.counter) //6
                })
                ```
                > setState只有在合成事件和钩子函数中是异步的，在setState回调函数，原生事件和setTimeout、setInterval中都是同步的？？
    - 函数组件: hooks[useState和useEffect]
5. 事件：绑定this的三种方法
    - 构造函数中绑定并覆盖: `this.change = this.change.bind(this)`
    - 方法定义为箭头函数：`change = () => {}`
    - 事件调用中定义为箭头函数: `onChange = {() => this.change()}`
6. 组件通讯
    - 父传子[props]：单向数据流
    - 子传父[事件，传参]：状态提升
    - 兄弟组件[通过共同的父组件搭桥]
    - 跨层级[context]
    - 任意两个组件通讯[redux]
    - 双向数据绑定
        - 受控组件：`<input type="text">`, `<textarea>` 和 `<select>` 之类的标签都非常相似,它们使用value + onChange事件实现受控组件。文件 `<input type="file"/>` 标签因为它的 value 只读，所以它是 React 中的一个非受控组件
7. 生命周期
    - V16.3之前的生命周期  
    <img src="../img/v16.3.png">
    - V16.4之后的生命周期  
    <img src="../img/v16.4.png">  
    - 总结：
        - `componentWillMount`, `componentWillReceiveProps`和`componentWillUpdate`被`getDerivedStateFromProps`取代
        - `getDerivedStateFromProps`会在render前，初始挂载和后续更新时被调用