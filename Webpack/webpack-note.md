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
6. devTool: 源代码与打包后的代码的映射关系，通过sourceMap定位到源代码
    - 6.1 各选项含义
        - cheap: 较快，不包含列信息
        - module: 第三方模块
        - eval: 速度最快,使用eval包裹模块代码
        - source-map: 产生.map文件
        - inline: 将.map作为DataURI嵌入，不单独生成.map文件
    - 6.2 开发环境配置：`devtool: 'cheap-module-eval-source-map'`
    - 6.3 线上环境不推荐开启，如果要开启可以用下面的配置: `devtool: 'cheap-module-source-map'`
7. devServer: WebpackDevServer启动服务
    - 跨域：proxy
    - 热模块替换：HMR
        - `hot: true`, webpack在热替换检查失败的情况会刷新整个页面
        - `hotOnly: true`, 如果HMR失败，也不会自动刷新浏览器
        - 对于html：无法HMR, 要使用livereload插件
        - 对于css: 内部css可以HMR，抽离出来的外部css文件无法HMR
        - 对于js: 无法HRM，需要使用module.hot.accept来观察模块更新，从而更新【麻烦】
# Babel处理ES6
1. 初步处理：`npm i babel-loader @babel/core @babel/preset-env -D`
    - 1.1 babel-loader: webpack 与 babel 的通信桥梁
    - 1.2 babel-core: babel核心 
    - 1.3 babel/preset-env：把es6转成es5
    - 上面这3个没办法把Promise等一些特性转换过来 —— 解决：
2. 方式一：@babel/polyfill `npm i @babel/polyfill -D`
    - 以全局变量的方式注入进来的。如windows.Promise，它会造成全局对象的污染【】
    - polyfill默认会把所有特性注入进来[939kib]
        - 改进：按需注入, 使用useBuiltIns [34.6KiB]
        - useBuiltIns选项是babel 7的新功能，这个选项告诉babel如何配置@babel/polyfill，它有三个参数可以使用
            - （1）entry: 需要在webpack的入口文件 import "@babel/polyfill"一次，babel会根据使用情况导入垫片，没有使用的功能不会被导入相应的垫片 
            - （2）usage: 不需要import，全自动检测，但是要安装@babel/polyfill。 (试验阶段)
            - （3）false【默认是false】: 如果只是import "@babel/polyfill"，它不会排除掉没有使用的垫片，程序体积会庞大(不推荐)
    - 当我们开发的是组件库，工具库这些场景的时候，polyfill就不适合 ，因为polyfill是注入到全局变量，window下的，会污染全局环境，所以推荐闭包方式:@babel/plugin-transform-runtime
3. 方式二：
# 配置React打包环境

