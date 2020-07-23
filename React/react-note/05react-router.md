# react全家桶 -- react-router
1. 安装
    - 1.1 浏览器版本：`npm i react-router-dom -S`
    - 1.2 Native版本：`npm i react-router-native -S`
2. 用法
    - 2.1 基本用法: 
        - 最外层：`<BrowserRouter>`或`<HashRouter>`
        - 路由链接：`<Link to='/demo'>`
        - 路由视图渲染：`<Route path='/demo' component={Demo}/>`
        - 精确匹配：根路由要添加exact `<Route exact path="/">`
        - 独占路由：`<Switch> ... </Switch>`
    - 2.2 动态路由：
        - `<Link to="/detail/123">`
        - `<Link to="/detail/456">`
        - `<Route path = "/detail/:id">`
    - 2.3 嵌套路由:
        - `<Link to = "/child/child1">`
        - `<Link to = "/child/child2">`
        - `<Route path = "/child/child1">`
        - `<Route path = "/child/child2">`
    - 2.4 404页面: 没有路径，必然匹配，放到最后
        - `<Route component = {() => <div>404</div>}>`
    - 2.5 路由守卫
        - 重定向：`<Redirect to={}/>`
    - 2.6 BrowserRouter vs HashRouter
        - BrowserRouter: history模式
        - HashRouter: hash模式  
        <img src="./img/hashRouter.png"/>
    - 2.7 动态引入 && 基于路由的代码分割
        - React.lazy: `const Home = lazy(() => import('./Home))`
        - Suspense: 在Suspense组件中渲染lazy组件，从而实现在加载lazy组件时做到优雅降级(如loading)
        ```javascript
        <Suspense fallback={<div>...loading</div>}>
            <Route path='/home' component = {Home} />
        </Suspense>
        ```
3. 原理
    - 3.1 实现 BrowserRouter
        - 历史记录管理对象：`this.history = createBrowserHistory(this.props)`
        - 页面location设为state实现变更监听：`this.state = {location: this.history.location}`
        - history和location向下传递: `<RouterProvider value={{history: this.history, location: this.state.location}}>{props.children}</RouterProvider>`
    - 3.2 实现 Route
        - 获取 BrowserRouter 提供的 location 属性：`{location} = useContext(RouterContext)`
        - 路由匹配：`const matchCurrent = props.path === location.pathname`
        - 组件渲染：`{matchCurrent && React.createElement(props.component)}`
    - 3.3 实现 Link
        - 获取 BrowserRouter 提供的 history 属性: `<RouterConsumer>{({history}) => <a onClick={e => linkHandler(e, history)}>{props.children}</a>}</RouterConsumer>`
        - 链接跳转：`<a href={props.to}>`
        - 处理点击事件：阻止a默认的跳转行为, 并把路径push进history对象: `linkHandler = (e, history) => {e.preventDefault(); history.push(props.to)}`