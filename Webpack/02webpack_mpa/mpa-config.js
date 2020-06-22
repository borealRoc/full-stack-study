const glob = require('glob')
const path = require('path')
const htmlWebpackPlugin = require("html-webpack-plugin")

const setMPA = () => {

    const entry = {}
    const htmlWebpackPlugins = []
    const output = {
        path: path.resolve(__dirname, "./build"),
        filename: '[name].js'
    }

    const entryFiles = glob.sync(path.join(__dirname, './src/*/*.js'))
    entryFiles.map(item => {
        const match = item.match(/src\/(.*)\/(.*)\.js$/)
        const pageName = match && match[1]

        // 多页面通用入口
        let pName = pageName + '/' + pageName
        entry[pName] = item

        // 多页面通用模板
        htmlWebpackPlugins.push(
            new htmlWebpackPlugin({
                title: pageName,
                template: path.join(__dirname, `src/${pageName}/${pageName}.html`),
                filename: `${pageName}/${pageName}.html`,
                chunks: [pName],
                inject: true
            })
        )
    })

    return {
        entry,
        output,
        htmlWebpackPlugins
    }
}

const { entry, output, htmlWebpackPlugins } = setMPA()
module.exports = {
    entry,
    output,
    htmlWebpackPlugins
}

