const express = require("express");
const fs = require("fs");

// 创建express实例
const app = express();

// 静态文件服务
app.use(express.static("../dist/client", { index: false }));

// 创建渲染器函数
const { createBundleRenderer } = require("vue-server-renderer");
const bundle = require("../dist/server/vue-ssr-server-bundle.json");

// 创建渲染器
const renderer = createBundleRenderer(bundle, {
    runInNewContext: false,
    template: fs.readFileSync("../public/index.temp.html", "utf-8"),
    clientManifest: require("../dist/client/vue-ssr-client-manifest.json"),
});

// 声明路由监听
app.get("*", async (req, res) => {
    // 获取page参数
    const context = {
        title: "ssr",
        url: req.url, // 从请求对象中获取url传递下去
    };
    const html = await renderer.renderToString(context);
    res.send(html);
});

app.listen(9000, () => {
    console.log("vue-ssr服务器启动成功！");
});