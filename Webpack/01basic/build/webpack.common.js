const path = require("path")
const htmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const merge = require("webpack-merge")
const devConfig = require("./webpack.dev")
const prodConfig = require("./webpack.prod")

const commonConfig = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, "../dist")
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name]_[hash].[ext]',
                        outputPath: 'images/',
                        limit: 10 * 1024
                    }
                }
            },
            {
                test: /\.(eot|ttf|woff|woff2|svg)$/,
                loader: 'file-loader'
            },
            {
                test: /\.(s[ac]ss)$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            title: 'Webpack Practice',
            filename: 'main.html',
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name][chunkhash:6].css'
        }),
        new VueLoaderPlugin()
    ],
}

module.exports = env => {
    if (env && env.production) {
        return merge(commonConfig, prodConfig);
    } else {
        return merge(commonConfig, devConfig);
    }
}