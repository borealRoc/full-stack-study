import React, { Component } from 'react'
import { BrowserRouter, Link, Route, Switch } from "react-router-dom"
import DynamicRouter from '../components/router/DynamicRouter'
import ChildsRouter from '../components/router/ChildsRouter'
import PrivateRoute from '../components/router/PrivateRoute'
import UserPage from '../components/router/UserPage'
import LoginPage from '../components/router/LoginPage'
import MyReactRouterTest from '../components/router/MyReactRouterTest'
import { LazyRouter } from '../components/router/LazyRouter'

export default class Router extends Component {
    render() {
        const dynamicID = Math.random()
        return (
            <div className="router-page">
                {/* hash模式 */}
                <BrowserRouter>
                    <div className="link-ctn">
                        <Link to={"/dynamic/" + dynamicID}>动态路由</Link>
                        <Link to="/child">嵌套路由</Link>
                        <Link to="/lazy">动态引入 && 基于路由的代码分割</Link>
                        <Link to="/user">路由守卫</Link>
                        <Link to="/testMyRouter">手写简版React Router</Link>
                    </div>
                    <div className="route-ctn">
                        <Switch>
                            <Route path="/dynamic/:id" component={DynamicRouter}></Route>
                            <Route path="/child" component={ChildsRouter}></Route>
                            <Route path="/lazy" component={LazyRouter}></Route>
                            <Route path="/login" component={LoginPage}></Route>Î
                            <PrivateRoute path="/user" component={UserPage}></PrivateRoute>
                            <Route path="/testMyRouter" component={MyReactRouterTest}></Route>
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}
