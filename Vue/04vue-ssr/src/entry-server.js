// 首屏渲染
import { createApp } from "./app";

// context由express传递进来
export default context => {
    // 返回Promise
    // 确保将来可能发生的异步数据请求
    return new Promise((resolve, reject) => {
        const { app, router } = createApp();
        // 首屏渲染谁根据url
        router.push(context.url);
        router.onReady(() => {
            resolve(app);
        }, reject);
    });
};
