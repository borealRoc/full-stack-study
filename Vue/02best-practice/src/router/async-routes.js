import Layout from '@/layout'

const asyncRoutes = [
    {
        path: "/async",
        component: Layout,
        redirect: "/async/about",
        meta: {
            title: '动态路由',
            icon: 'about'
        },
        children: [
            {
                path: "about",
                component: () =>
                    import(/* webpackChunkName: "about" */ "@/views/About.vue"),
                name: "about",
                meta: {
                    // 角色决定将来那些用户可以看到该路由
                    roles: ['admin', 'editor'],
                    title: 'About',
                    icon: 'user'
                },
            },
            {
                path: 'news',
                component: () => import(/* webpackChunkName: "news" */ "@/views/News.vue"),
                meta: {
                    roles: ['admin'],
                    title: 'News',
                    icon: 'news'
                }
            },
            {
                path: 'contact',
                component: () => import(/* webpackChunkName: "news" */ "@/views/Contact.vue"),
                meta: {
                    roles: ['editor'],
                    title: 'Contact',
                    icon: 'contact'
                }
            },
        ]
    },
]

export default asyncRoutes