import Layout from '@/layout'

const asyncRoutes = [
    {
        path: "/about",
        component: Layout,
        redirect: "/about/index",
        children: [
            {
                path: "index",
                component: () =>
                    import(/* webpackChunkName: "about" */ "@/views/About.vue"),
                name: "about",
                meta: {
                    // 角色决定将来那些用户可以看到该路由
                    roles: ['admin', 'editor']
                },
            }
        ]
    }
]

export default asyncRoutes