const path = require('path')

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
            // 处理静态资源模块
            {
                test: /\.(png|jpe?g|gif)$/,
                // 使用一个loader可以用对象
                use: {
                    loader: 'file-loader',
                    // 额外的配置
                    options: {
                        // 打包后的文件的文件名
                        // [name]: 老资源的文件名
                        // [hash]: 随机的hash值
                        // [ext]: 老资源的文件格式
                        name: '[name]_[hash].[ext]',
                        // 打包后的资源的存放位置
                        // 'images/'结合上面的output表示存放在 /build/images/
                        outputPath: 'images/'
                    }
                }
            },
            // 处理字体
            {
                test: /\.(eot|ttf|woff|woff2|svg)$/,
                // 同个loader可以根据规则的不同写成多个
                use: 'file-loader'
            },
            // css相关
            {
                test: /\.css$/,
                // 使用多个loader用数组，loader从后往前执行
                use: ['style-loader', 'css-loader'],
            }
        ]
    }
}