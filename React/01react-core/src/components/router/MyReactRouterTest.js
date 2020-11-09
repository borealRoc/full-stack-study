import React from 'react'
import { MyBrowserRouter, MyLink, MyRoute } from "../../lib/myReactRouter"
import Basic from '../../pages/Basic'
import DynamicRouter from "./DynamicRouter"

export default function MyReactRouterTest() {
    const dynamicID = Math.random()
    return (
        <div>
            <div className="router-page">
                <MyBrowserRouter>
                    <div className="link-ctn">
                        <MyLink to="/basic">react 基础语法</MyLink>
                        <MyLink to="/children">测试route-children</MyLink>
                        <MyLink to="/render">测试route-render</MyLink>
                        <MyLink to={"/dynamic/" + dynamicID}>测试动态路由</MyLink>
                    </div>
                    <div className="route-ctn">
                        <MyRoute path="/basic" component={Basic}></MyRoute>
                        <MyRoute path="/dynamic/:id" component={DynamicRouter}></MyRoute>
                        <MyRoute path="/children" children={() => <div>我是route-children渲染出来的</div>}></MyRoute>
                        <MyRoute path="/render" render={() => <div>我是route-render渲染出来的</div>}></MyRoute>
                    </div>
                </MyBrowserRouter>
            </div>

        </div>
    )
}
