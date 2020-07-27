export default ({
    // 路由配置
    // routes: [
    //     { component: '@/pages/404' }
    // ]

    // @umijs/preset-react
    dva: {
        // 是否启用 immer 以方便修改 reducer
        immer: true,
        // 是否启用 dva model 的热更新
        hmr: false,
    },
    antd: {}
})