// 用于浏览器中激活内容
import { createApp } from './app'

const { app, router } = createApp();

router.onReady(() => {
    // 挂载以后页面就激活了称为可交互spa
    app.$mount('#app')
})