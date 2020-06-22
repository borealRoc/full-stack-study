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
}
module.exports = devConfig