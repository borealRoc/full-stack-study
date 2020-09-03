const koa = require("koa");
const { initRouter, initController } = require("./loader");
class MyEgg {
    constructor(conf) {
        this.$app = new koa(conf);
        this.$ctrl = initController(); // 先初始化控制器，路由对它有依赖
        this.$router = initRouter(this); // 把MyEgg实例传进去
        this.$app.use(this.$router.routes());
    }
    start(port) {
        this.$app.listen(port, () => {
            console.log("服务器启动成功，端口" + port);
        });
    }
}
module.exports = MyEgg;