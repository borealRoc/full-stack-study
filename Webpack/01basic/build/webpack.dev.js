const webpack = require("webpack")
const { DllReferencePlugin } = require("webpack")
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin")
const path = require("path")

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
        // 在主要的配置文件中引入DllPlugin插件打包好的动态链接库文件
        new DllReferencePlugin({
            manifest: require("../dll/react-manifest.json")
        }),
        // 将打包后的 dll.js 文件注入到我们生成的 index.html 中
        new AddAssetHtmlWebpackPlugin({
            filepath: path.resolve(__dirname, "../dll/react.dll.js") // 对应的 dll 文件路径
        })
    ],
    // optimization: {
    //     splitChunks: {
    //         // 代码分割
    //         chunks: 'all', //所有模块有效[async:异步模块]
    //         minSize: 30000, //当第三方模块大于30kb
    //         maxSize: 0, //对模块进行二次分割时使用，不推荐使用
    //         minChunks: 1, //打包生成的chunk文件最少有几个chunk引用了这个模块[至少有多个文件引入了lodash]
    //         maxInitialRequests: 5, //入口文件同步请求5次【前5个第三方库才进行分割】
    //         automaticNameDelimiter: '-', //打包生成的文件名的连接方式[vendors-main.bundle]
    //         name: true, //可以修改生成的文件名
    //         // 缓存组
    //         cacheGroups: {
    //             // 通过npm install即放到node_modules里面的第三方库都会放在vendors组
    //             vendors: {
    //                 // filename: 'loadash', //上面设置了name: true, 所以这里可以修改生成的文件名
    //                 test: /[\\/]node_modules[\\/]/, //引用的模块是不是在node_modules里
    //                 priority: -10//优先级 数字越大，优先级越高
    //             },
    //             // 其它的第三方库放在default组
    //             default: {
    //                 minChunks: 2,
    //                 priority: -20,
    //                 reuseExistingChunk: true
    //             }
    //         }
    //     }
    // },
}
module.exports = devConfig