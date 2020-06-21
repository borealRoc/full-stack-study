const { entry, htmlWebpackPlugins } = require('./mpa-config')
const path = require('path')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
    entry,
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: '[name].js'
    },
    mode: 'development',
    plugins: [
        ...htmlWebpackPlugins,
        new CleanWebpackPlugin(),
    ]
}