export const actions = {
    // nuxtServerInit必须声明在store下的index.js
    // nuxtServerInit只会在服务器初始化的时候执行一次
    // 参数1是action上下文，参数2是组件上下文
    nuxtServerInit({ commit }, ctx) {
        console.log(`执行nuxtServerInit`)
        // 因为用了"cookie-universal-nuxt"，所以这里能通过app.$cookies获取cookie
        const token = ctx.app.$cookies.get("token");
        if (token) {
            commit("user/init", token);
        }
    }
};