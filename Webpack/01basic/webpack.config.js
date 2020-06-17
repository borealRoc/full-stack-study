const path = require('path')
const htmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    entry: './src/index.js',
    output: {
        // 输出文件的名字
        filename: 'bundle.js',
        // 输出文件的路径，必须是绝对路径
        path: path.resolve(__dirname, "build")
    },
    mode: 'development',
    module: {
        rules: [
            // 1.处理静态资源模块
            // 1.1 处理图片
            {
                test: /\.(png|jpe?g|gif)$/,
                // 使用一个loader可以用对象
                use: {
                    // loader: 'file-loader',
                    // url-loader内部使用了file-loader,所以可以处 file-loader所有的事情，但是它多了一个limit选项，会把limit以下大小的图片转换成base64格式字符 
                    loader: 'url-loader',
                    // 额外的配置
                    options: {
                        // 打包后的文件的文件名
                        // [name]: 老资源的文件名
                        // [hash]: 随机的hash值
                        // [ext]: 老资源的文件格式
                        name: '[name]_[hash].[ext]',
                        // 打包后的资源的存放位置
                        // 'images/'结合上面的output表示存放在 /build/images/
                        outputPath: 'images/',
                        // 下面表示小于10kb，转换成base64 
                        limit: 10 * 1024
                    }
                }
            },
            // 1.2 处理字体
            // 同个loader可以根据规则的不同写成多个
            {
                test: /\.(eot|ttf|woff|woff2|svg)$/,
                loader: 'file-loader'
            },
            // 2.css相关
            // 2.1 处理sass/scss文件
            {
                test: /\.(s[ac]ss)$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            // 2.2 处理less文件
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            // 2.3 处理css文件,以及将样式以内部样式的形式插入到index.html的<head>中
            {
                test: /\.css$/,
                // 使用多个loader用数组，loader从后往前执行
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                require("autoprefixer")({
                                    overrideBrowserslist: ["last 2 versions", ">1%"]
                                })
                            ]
                        }
                    }
                ],
            }
        ]
    },
    plugins: [
        // htmlwebpackplugin会在打包结束后，自动生成一个html文件，并把打包生成的js,css模块引入到该html中
        new htmlWebpackPlugin({
            title: 'Webpack Practice',
            filename: 'main.html',
            template: './src/index.html'
        }),
        // 每次打包都会清空build/下的文件
        new CleanWebpackPlugin(),
        // 把打包的css模块以文件的形式生成在build文件夹下
        new MiniCssExtractPlugin({
            filename: '[name][chunkhash:6].css'
        })
    ]
}