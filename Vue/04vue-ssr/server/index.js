const express = require("express");
const Vue = require("vue");

// 创建express实例
const app = express();
// 创建渲染器函数
const renderer = require("vue-server-renderer").createRenderer();
// 创建要渲染的服务器实例
const page = new Vue({
    data: { mes: "fvue-server-rendereroo" },
    template: `
        <div>
            <h1>利用{{mes}}在服务器渲染Vue文件</h1>
        </div>
    `
});
// 声明路由监听
app.get("/", async (req, res) => {
    const html = await renderer.renderToString(page);
    res.send(html);
});
app.listen(3000, () => {
    console.log("渲染服务器启动成功！");
});
