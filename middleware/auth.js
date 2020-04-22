export default function ({ route, redirect, store }) { // 上下文中通过store访问vuex中的全局状态
    // 通过vuex中令牌存在与否判断是否登录
    if (!store.state.user.token) {
        redirect("/login?redirect=" + route.path);
    }
}
// 思考：每次刷新浏览器的时候，为什么需要重新登录？
// 答：在每次刷新浏览器的时候，store中的token会被清空。
// 解决方法一：nuxtServerInit 执行时间比 middleware 要早，如果想预加载数据或者用户权限判断，最好是在 nuxtServerInit 处理完相应的数据
// 在store/index.js中，通过nuxtServerInit这个钩子，在获取到浏览器存取的cookie后，将其赋值给store的token
