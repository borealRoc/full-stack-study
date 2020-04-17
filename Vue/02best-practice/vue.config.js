const port = 7080
const title = 'vue最佳实践'
 // post参数转换
const bodyParser = require("body-parser")

const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
    publicPath: '/best',
    devServer: {
        port,
        before: app => {
            app.use(bodyParser.json()); // 处理post参数

            app.post("/dev-api/user/login", (req, res) => {
                const { username } = req.body;

                if (username === "admin" || username === "xusp") {
                    res.json({
                        code: 1,
                        data: username,
                    });
                } else {
                    res.json({
                        code: 10204,
                        message: "用户名或密码错误",
                    });
                }
            });

            app.get("/dev-api/user/info", (req, res) => {
                const auth = req.headers["authorization"];
                const roles = auth.split(" ")[1] === "admin" ? ["admin"] : ["editor"];
                res.json({
                    code: 1,
                    data: roles,
                });
            });
        },
    },
    configureWebpack: {
        // 向index.html注入标题
        name: title
    },
    // 链式操作: 修改vue-cli原有的webpack规则，定义新的规则
    chainWebpack(config) {
        // 原先配置的svg规则排除src/icons中的svg文件
        config.module.rule('svg').exclude.add(resolve('src/icons'))
        // 新增icons规则，用svg-sprite-loader处理src/icons中的svg文件
        config.module.rule('icons').test(/\.svg$/)
            .include.add(resolve('src/icons')).end() //add完上下文是数组不是icons规则，使用end()回退
            .use('svg-sprite-loader').loader("svg-sprite-loader").options({ symbolId: 'icon-[name]' })
            .end()
    }
}