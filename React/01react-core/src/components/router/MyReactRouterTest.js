import React from 'react'
import { MyBrowserRouter, MyLink, MyRoute } from "../../lib/myReactRouter"
import Basic from '../../pages/Basic'
import Comp from '../../pages/Comp'
import Redux from '../../pages/Redux'

export default function MyReactRouterTest() {
    return (
        <div>
            <div className="router-page">
                <MyBrowserRouter>
                    <div className="link-ctn">
                        <MyLink to="/basic">react 基础语法</MyLink>
                        <MyLink to="/comp">react 组件化</MyLink>
                        <MyLink to="/redux">react 状态管理：redux</MyLink>
                    </div>
                    <div className="route-ctn">
                        <MyRoute path="/basic" component={Basic}></MyRoute>
                        <MyRoute path="/comp" component={Comp}></MyRoute>
                        <MyRoute path="/redux" component={Redux}></MyRoute>
                    </div>
                </MyBrowserRouter>
            </div>

        </div>
    )
}
