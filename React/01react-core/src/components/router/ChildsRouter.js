import React from 'react'
import { Link, Route } from "react-router-dom"

export default function ChildsRouter() {
    return (
        <div className="router-page">
            <div className="link-ctn">
                <Link to="/child/child1">子页面1</Link>
                <Link to="/child/child2">子页面2</Link>
            </div>
            <div className="route-ctn">
                <Route path="/child/child1" component={() => <div>我是子页面一</div>}></Route>
                <Route path="/child/child2" component={() => <div>我是子页面二</div>}></Route>
            </div>
        </div>
    )
}
