import Layout from '@/layout'

const constRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import("@/views/Login"),
        meta: {
            title: '登录',
            icon: 'login'
        },
        // 导航菜单忽略该项
        // hidden: true
    },
    {
        path: '/',
        component: Layout, //布局页面
        redirect: '/home',
        meta: {
            title: '静态路由',
            icon: 'vue'
        },
        children: [
            {
                path: 'home',
                // webpack中动态import()打包后的文件名称定义:/* webpackChunkName: "home" */
                component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
                name: 'home',
                meta: {
                    title: 'Home',
                    icon: 'home'
                }
            }
        ]
    }
]

export default constRoutes