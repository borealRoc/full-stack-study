const path = require('path')

module.exports = {
    entry: './index',
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].js"
    },
    mode: 'development',
    // 解析loader的路径
    resolveLoader: {
        // 如果要使用loarder,先找node_modules里面的，找不到就去loaders文件夹找
        modules: ["node_modules", "./loaders"]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "replaceLoader",
                        options: {
                            name: "welcome"
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
    }
}