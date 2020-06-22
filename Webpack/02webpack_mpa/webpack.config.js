const { entry, output, htmlWebpackPlugins } = require('./mpa-config')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")


module.exports = {
    entry,
    output,
    mode: 'development',
    plugins: [
        ...htmlWebpackPlugins,
        new CleanWebpackPlugin(),
    ]
}