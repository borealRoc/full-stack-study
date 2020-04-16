import Layout from '@/layout'

const asyncRoutes = [
    {
        path: "/about",
        component: Layout,
        redirect: "/about/index",
        meta: {
            // 角色决定将来那些用户可以看到该路由
            roles: ['admin', 'editor']
        },
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
    },
    {
        path: '/news',
        component: () => import(/* webpackChunkName: "news" */ "@/views/News.vue"),
        meta: {
            roles: ['admin']
        }
    },
    {
        path: '/contact',
        component: () => import(/* webpackChunkName: "news" */ "@/views/Contact.vue"),
        meta: {
            roles: ['editor']
        }
    },
]

export default asyncRoutes