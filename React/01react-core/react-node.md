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


