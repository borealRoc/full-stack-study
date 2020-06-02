import React, { Component } from 'react'
import "./home.css"
import Basic from './Basic'
import Comp from './Comp'
import Redux from './Redux'
import { BrowserRouter, Link, Route, Switch } from "react-router-dom"


export default class Home extends Component {
    render() {
        return (
            <div className="home">
                <h1 className="home-title">Welcome Use React</h1>
                <BrowserRouter>
                    <div className="link-modal">
                        <nav>
                            <Link to="/basic">react 基础语法</Link>
                            <Link to="/comp">react 组件化</Link>
                            <Link to="/redux">react 状态管理：redux</Link>
                        </nav>
                    </div>
                    <div className="route-modal">
                        <Route path="/basic" component={Basic}></Route>
                        <Route path="/comp" component={Comp}></Route>
                        <Route path="/redux" component={Redux}></Route>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}
