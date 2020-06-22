const webpack = require("webpack")

const devConfig = {
    mode: "development",
    devtool: "cheap-module-eval-source-map",
    devServer: {
        contentBase: "./dist",
        watchContentBase: true,
        port: 8081,
        open: true,
        proxy: {
            "/api": {
                target: "http://localhost:3000"
            }
        },
        hot: true,
        hotOnly: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    optimization: {
        splitChunks: {
            // 代码分割
            chunks: 'all', //所有模块有效[async:异步模块]
            minSize: 30000, //当第三方模块大于30kb
            maxSize: 0, //对模块进行二次分割时使用，不推荐使用
            minChunks: 1, //打包生成的chunk文件最少有几个chunk引用了这个模块
            maxInitialRequests: 3, //入口文件同步请求3次 
            automaticNameDelimiter: '-',
            name: true, //可以修改生成的文件名
            cacheGroups: {
                vendors: {
                    // filename: 'loadash', //生成的文件名
                    test: /[\\/]node_modules[\\/]/, //引用的模块是不是在node_modules里
                    priority: -10//优先级 数字越大，优先级越高
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
}
module.exports = devConfig