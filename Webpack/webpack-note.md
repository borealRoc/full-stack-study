# 基础语法
1. 定义：模块打包工具
2. 安装：推荐局部安装 `npm i webpack webpack-cli -D`
3. 启动: `npx webpack` npx在项目的node_modules里面查找webpack
3. 零配置
    - 只定义入口，出口和模式
    - 只能识别js文件
# 核心概念
1. 入口[entry]
    - 1.1 单入口SPA：字符串 `entry: './src/index.js'`
    - 1.2 多入口：对象 `entry: {index: '', login: ''}`
2. 出口[output]
    - 2.1 单出口
    ```javascript
    output: {
        filename: 'bundle.js', //文件名
        path: path.resolove(__dirname, 'dist') //文件路径（必须是绝对路径）
    }
    ```
    - 2.2 多出口
    ```javascript
    output: {
        filename: '[name][chunkhash:8].js' //占位符，’chunkhash‘保证文件名称不重复
        path: path.resolove(__dirname, 'dist') //文件路径（必须是绝对路径）
    }
    ```
3. 环境[mode]: 设置mode可以触发webpack内置的函数，达到优化效果
    - 3.1 production：帮助模块压缩
    - 3.2 development：有利于热更新的处理
    - 3.3 none：退出任何默认优化选项
4. 模块[module]
    - 4.1 定义：webpack里一切皆模块，一个模块对应一个文件
    - 4.2 loader：不认识的模块，就用loader来处理
        - 4.2.1 同个loader可以根据规则的不同写成多个
        - 4.2.2 loader的执行顺序：从上到下，从右到左
    - 4.3 常用loader
        - file-loader: 当仅仅是要把模块从源代码移到打包目录，比如一些静态资源（图片，字体...）
        - url-loader: file-loader加强版，多了一个limit选项，会把limit以下大小的图片转换成base64格式字符
        - css-loader: 处理css文件
        - style-loader: 将样式以内部样式的形式插入到index.html的`<head>`中
        - postcss-laoder: autoprefixer插件可以给css3某些属性自动添加前缀
5. 插件[plugins]
    - 5.1 定义：在webpack运动到某个阶段的时候，执行某些任务，类似于生命周期的概念
    - 5.2 常用plugins
        - HtmlWebpackPlugin: 在打包结束后，自动生成一个html文件，并把打包生成的js,css模块引入到该html中
        - CleanWebpackPlugin: 每次打包清空build/下的文件
        - MiniCssExtractPlugin: 把打包的css模块以文件的形式分离在build文件夹下