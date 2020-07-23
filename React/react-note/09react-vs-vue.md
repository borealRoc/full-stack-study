# react VS vue
## 相同点
1. 都是用于创建UI[数据->视图]的JS库
2. 都是用虚拟DOM
3. 都有独立的路由器和状态管理库插件：vue-router + vuex => react-router + react-redux
4. vue借鉴react的一些点
    - 4.1 插槽：slot => 组件复合[props.children]
    - 4.2 组件跨层通信：provide && inject => Context中的 Provider && Consumer
    - 4.3 状态存储store模块化：modules => combineReducers
## 不同点
1. 模板：Vue通常用HTML模板[html,css,js分离]，React全是JS
2. 组件机制：Vue组件分为全局注册和局部注册，react都是通过import，然后直接在任意地方使用
3. react做的事情很少，很多事情交给社区做；vue很多东西都是内置的，写起来方便一点
    - Vue比react多了指令系统，让模板可以实现更丰富的功能，而React只能使用JSX
    - Vue有双向绑定语法糖，React没有
    - Vue有computed和watch，React中需要自己写逻辑实现