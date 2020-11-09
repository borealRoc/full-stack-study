export default function ({ $axios, store }) {
    //onRequest是@nuxt.js/ axios提供的方法 
    $axios.onRequest(config => {
        if (store.state.user.token) {
            // 附加令牌
            config.headers.Authorization = "Bearer " + store.state.user.token;
        }
        return config;
    });
}