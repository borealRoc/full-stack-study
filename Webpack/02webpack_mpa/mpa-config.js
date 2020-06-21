const glob = require('glob')
const path = require('path')
const htmlWebpackPlugin = require("html-webpack-plugin")

const setMPA = () => {
    const entry = {}
    const htmlWebpackPlugins = []

    const entryFiles = glob.sync(path.join(__dirname, './src/*/*.js'))
    entryFiles.map((item, index) => {
        const match = item.match(/src\/(.*)\/(.*)\.js$/)
        const pageName = match && match[1]
        
        // 多页面通用入口
        entry[pageName] = item

        // 多页面通用插件
        htmlWebpackPlugins.push(
            new htmlWebpackPlugin({
                title: pageName,
                template: path.join(__dirname, `src/${pageName}/${pageName}.html`),
                filename: `${pageName}.html`,
                chunks: [pageName],
                inject: true
            })
        )
    })

    return {
        entry,
        htmlWebpackPlugins
    }
}

const { entry, htmlWebpackPlugins } = setMPA()
module.exports = {
    entry,
    htmlWebpackPlugins
}