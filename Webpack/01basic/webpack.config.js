const path = require('path')
const htmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const webpack = require("webpack")

module.exports = {
    // 1.入口
    entry: './src/index.js',

    // 2.出口
    output: {
        // 输出文件的名字
        filename: 'bundle.js',
        // 输出文件的路径，必须是绝对路径
        path: path.resolve(__dirname, "dist")
    },

    // 3.webpack运行环境
    mode: 'development',

    // 4.源代码与打包后的代码的映射关系，通过sourceMap定位到源代码
    // cheap: 较快，不包含列信息
    // module: 第三方模块
    // eval: 速度最快,使用eval包裹模块代码
    // source-map: 产生.map文件
    // inline: 将.map作为DataURI嵌入，不单独生成.map文件
    // 开发环境配置
    devtool: 'cheap-module-eval-source-map',
    // 线上环境不推荐开启，如果要开启可以用下面的配置
    // devtool: 'cheap-module-source-map',

    // 5. WebpackDevServer,启动服务
    // 5.1 启动服务后，会发现dist目录没有了，这是因为devServer把打包后的模块不会放在dist目录下，而是放到内存中，从而提升速度
    // 5.2 修改代码【webpack配置除外】自动刷新
    devServer: {
        contentBase: "./dist", //服务源文件目录
        watchContentBase: true,
        port: 8081, //端口
        open: true, //启动服务后自动弹出浏览器窗口
        // 跨域，通过代理的方式
        proxy: {
            "/api": {
                target: "http://localhost:3000"
            }
        },
        // 开启热更新
        // 对于css: 内部css可以HMR，外部css文件无法HMR
        // 对于js: 无法HRM，需要使用module.hot.accept来观察模块更新，从而更新【麻烦】
        hot: true, //如果HMR失败，可能会刷新浏览器
        hotOnly: true, // 如果HMR失败，也不会自动刷新浏览器
    },

    // 6. 模块，放所有loader
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
            // 2.3 处理css文件
            {
                test: /\.css$/,
                // 使用多个loader用数组，loader从后往前执行
                use: [
                    // 样式以内部样式的形式插入到index.html的<head>中
                    // 'style-loader',
                    // 打包好的样式会生成样式文件
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    // 把下面postcss-loader的配置抽离到根目录下的postcss.config.js中
                    // {
                    //     loader: "postcss-loader",
                    //     options: {
                    //         plugins: [
                    //             require("autoprefixer")({
                    //                 overrideBrowserslist: ["last 2 versions", ">1%"]
                    //             })
                    //         ]
                    //     }
                    // }
                ],
            },
            // 3 babel
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    // options: {
                    //     presets: ["@babel/preset-env"]
                    // }
                    options: {
                        "presets": [
                            [
                                "@babel/preset-env",
                                {
                                    "targets": {
                                        "edge": "17",
                                        "firefox": "60",
                                        "chrome": "67",
                                        "safari": "11.1"
                                    },
                                    "corejs": 2,
                                    "useBuiltIns": "usage"
                                }
                            ]
                        ]
                    }
                }
            },
        ]
    },

    // 7. 插件
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
        }),
        // 开启HMR
        new webpack.HotModuleReplacementPlugin()
    ]
}