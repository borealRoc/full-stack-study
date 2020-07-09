const path = require("path")
const htmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const merge = require("webpack-merge")
const devConfig = require("./webpack.dev")
const prodConfig = require("./webpack.prod")
const HappyPack = require("happypack") //!优化loader的处理时间
const happyThreadPool = HappyPack.ThreadPool({ size: 5 });

const happyConfig = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, "../dist")
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/,
                // use: {
                //     loader: 'url-loader',
                //     options: {
                //         name: '[name]_[hash].[ext]',
                //         outputPath: 'images/',
                //         limit: 10 * 1024
                //     }
                // }
                use: ["happypack/loader?id=pic"]
            },
            {
                test: /\.(eot|ttf|woff|woff2|svg)$/,
                // loader: 'file-loader'
                use: ["happypack/loader?id=font"]
            },
            {
                test: /\.(s[ac]ss)$/i,
                // use: ['style-loader', 'css-loader', 'sass-loader'],
                use: ["happypack/loader?id=scss"]
            },
            {
                test: /\.less$/,
                // use: ['style-loader', 'css-loader', 'less-loader'],
                use: ["happypack/loader?id=less"]
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
                // use: {
                //     loader: 'babel-loader',
                // }
                use: ["happypack/loader?id=babel"]
            },
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
        new HappyPack({
            id: "pic",
            loaders: [
                {
                    loader: 'url-loader',
                    options: {
                        name: '[name]_[hash].[ext]',
                        outputPath: 'images/',
                        limit: 10 * 1024
                    }
                }
            ],
            threadPool: happyThreadPool
        }),
        new HappyPack({
            id: "font",
            loaders: ['file-loader'],
            threadPool: happyThreadPool
        }),
        new HappyPack({
            id: "scss",
            loaders: ['style-loader', 'css-loader', 'sass-loader'],
            threadPool: happyThreadPool
        }),
        new HappyPack({
            id: "less",
            loaders: ['style-loader', 'css-loader', 'less-loader'],
            threadPool: happyThreadPool
        }),
        new HappyPack({
            id: "babel",
            loaders: ['babel-loader'],
            threadPool: happyThreadPool
        }),
    ],
}

module.exports = env => {
    if (env && env.production) {
        return merge(happyConfig, prodConfig);
    } else {
        
        return merge(happyConfig, devConfig);
    }
}