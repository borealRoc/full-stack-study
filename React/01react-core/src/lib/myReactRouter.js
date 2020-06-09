import React, { Component, useContext } from 'react'
import { createBrowserHistory } from "history"
import matchPath from "./matchPath"

const RouterContext = React.createContext()
const RouterProvider = RouterContext.Provider
const RouterConsumer = RouterContext.Consumer

// 实现 BrowserRouter
// 历史记录管理对象history初始化及向下传递
// location变更监听
export class MyBrowserRouter extends Component {
    constructor(props) {
        super(props)
        this.history = createBrowserHistory(this.props)
        // 把页面location的变化设置为state，以实现动态渲染
        this.state = {
            location: this.history.location
        }
        // 但页面发生跳转，即location发生变化时，监听这个变化
        this.unlisten = this.history.listen(location => {
            this.setState({ location })
        })
    }

    componentWillUnmount() {
        // 去除监听
        this.unlisten && this.unlisten()
    }

    render() {
        const { children } = this.props
        return (
            <RouterProvider value={{
                history: this.history,
                location: this.state.location
            }}>
                {children}
            </RouterProvider>
        )
    }
}

// 实现 Route：路由匹配，内容渲染
export function MyRoute(props) {
    // 获取BrowserRouter传递的location
    const ctx = useContext(RouterContext)
    const { location } = ctx
    // 路由匹配：手动low版路由匹配
    // 获取在使用MyRoute时传递的path和component参数
    // const { path, component: comp } = props
    // const matchCurrent = path === location.pathname
    // 路由匹配：借用matchPath进行路由匹配
    const { component: comp } = props
    const match = matchPath(location.pathname, props)
    const matchCurrent = match && match.isExact
    const compProps = { ...ctx, match }
    return (
        <>
            {matchCurrent && comp ? React.createElement(comp, compProps) : null}
        </>
    )
}

// 实现 Link：跳转链接，处理点击事件
export const MyLink = ({ to, children }) => {
    const linkHandler = (e, history) => {
        // 进制a标签的默认行为
        e.preventDefault()
        // 把链接添加进history对象
        history.push(to)
    }
    return (
        <RouterConsumer>
            {
                ({ history }) => <a href={to} onClick={e => linkHandler(e, history)}>{children}</a>
            }
        </RouterConsumer>
    )
}