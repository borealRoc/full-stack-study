import React, { Component } from 'react'
import "./home.css"
import Index from './Index'
import Basic from './Basic'
import Comp from './Comp'
import Redux from './Redux'
import RouterDemo from './Router'
import { BrowserRouter, Link, Route, Switch } from "react-router-dom"

export default class Home extends Component {
    render() {
        return (
            <div className="home">
                <BrowserRouter>
                    <h1 className="home-title">
                        <Link to="/">Welcome Use React</Link>
                    </h1>
                    <div className="link-modal">
                        <nav>
                            <Link to="/basic">react 基础语法</Link>
                            <Link to="/comp">react 组件化</Link>
                            <Link to="/redux">react 状态管理：redux</Link>
                            <Link to="/router">react 路由管理：react-router</Link>
                        </nav>
                    </div>
                    <div className="route-modal">
                        {/* 独占路由 */}
                        <Switch>
                            {/* 根路由添加exact，实现精确匹配 */}
                            <Route path="/" exact component={Index}></Route>
                            <Route path="/basic" component={Basic}></Route>
                            <Route path="/comp" component={Comp}></Route>
                            <Route path="/redux" component={Redux}></Route>
                            <Route path="/router" component={RouterDemo}></Route>
                            {/* 404页面：上面都匹配不到，才会匹配404，所以它必须放到最后 */}
                            <Route component={() => <div>404页面</div>}></Route>
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}
