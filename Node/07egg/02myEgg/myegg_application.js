const koa = require("koa");
const { initRouter } = require("./loader");
class MyEgg {
    constructor(conf) {
        this.$app = new koa(conf);
        this.$router = initRouter();
        this.$app.use(this.$router.routes());
    }
    start(port) {
        this.$app.listen(port, () => {
            console.log("服务器启动成功，端口" + port);
        });
    }
}
module.exports = MyEgg;