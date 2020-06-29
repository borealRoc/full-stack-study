const path = require('path')
const CopyrightWebpackPlugin = require("./plugins/copyright-webpack-plugin")

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].js"
    },
    mode: 'development',
    // 6. 解析loader的路径
    resolveLoader: {
        // 下面的配置表明：如果要使用loarder,先找到node_modules找，找不到就去loader文件夹找
        modules: ["node_modules", "./loader"]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    // 5. 多个loader：顺序，自下而上，自右到左
                    // {
                    //     loader: path.resolve(__dirname, './loader/replaceLoaderAsync.js'),
                    //     options: {
                    //         name: '北冥有鱿鱼'
                    //     }
                    // },
                    // {
                    //     loader: path.resolve(__dirname, './loader/replaceLoader.js'),
                    //     options: {
                    //         str: '你好不好'
                    //     }
                    // },
                    // 6. 处理loader的路径问题
                    {
                        loader: "replaceLoader",
                        options: {
                            str: "welcome"
                        }
                    },
                    {
                        loader: "replaceLoaderAsync",
                        options: {
                            name: "webpack4"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CopyrightWebpackPlugin({
            name: '我是插件参数',
        })
    ]
}