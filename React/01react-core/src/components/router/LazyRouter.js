import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import React, { Suspense, lazy } from 'react'

const DynamicRouter = lazy(() => import('./DynamicRouter'))

export const LazyRouter = () => {
    const dynamicID = Math.random()
    return (
        <Router>
            <Link to={"/dynamic/" + dynamicID}>动态路由</Link>
            {/* fallback 属性接受任何在组件加载过程中你想展示的 React 元素*/}
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route path="/dynamic/:id" component={DynamicRouter} />
                </Switch>
            </Suspense>
        </Router>
    )
}