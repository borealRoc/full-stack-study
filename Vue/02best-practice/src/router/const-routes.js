import Layout from '@/layout'

const constRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import("@/views/Login")
    },
    {
        path: '/',
        component: Layout, //布局页面
        redirect: '/home',
        children: [
            {
                path: 'home',
                // webpack中动态import()打包后的文件名称定义:/* webpackChunkName: "home" */
                component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
                name: 'home',
            }
        ]
    }
]

export default constRoutes