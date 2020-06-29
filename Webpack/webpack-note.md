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
        - babel-loader: 编译es6, react, vue...
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
# Babel
1. 处理ES6
    - 1.1 初步处理：`npm i babel-loader @babel/core @babel/preset-env -D`
        - 1.1 babel-loader: webpack 与 babel 的通信桥梁
        - 1.2 babel-core: babel核心 
        - 1.3 babel/preset-env：把es6转成es5
        - 上面这3个没办法把Promise等一些特性转换过来 —— 有以下两种方式可以解决：
    - 1.2 方式一：@babel/polyfill `npm i @babel/polyfill -D`
        - polyfill默认会把所有特性注入进来[导致打包后的文件很大]
            - 改进: 按需注入, 使用useBuiltIns
                - useBuiltIns选项是babel 7的新功能，这个选项告诉babel如何配置@babel/polyfill，它有三个参数可以使用
                    - （1）entry: 需要在webpack的入口文件 import "@babel/polyfill"一次，babel会根据使用情况导入垫片，没有使用的功能不会被导入相应的垫片 
                    - （2）usage: 不需要import，全自动检测，但是要安装@babel/polyfill。 (试验阶段)
                    - （3）false【默认是false】: 如果只是import "@babel/polyfill"，它不会排除掉没有使用的垫片，程序体积会庞大(不推荐)
                - 注明’targets‘选项，表明需要兼容的浏览器的最低版本，如果浏览器支持这个特性，就无需编译[这个很重要]
            - 缺点：当我们开发的是组件库，工具库这些场景的时候，polyfill就不适合 ，因为polyfill是注入到全局变量，window下的，会污染全局环境，所以推荐闭包方式:@babel/plugin-transform-runtime
    - 1.3 方式二：@babel/plugin-transform-runtime： `npm i @babel/plugin-transform-runtime @babel/runtime -D`
2. 配置React打包环境: `npm i @babel/preset-react -D`
# 多页面打包通用方案
1. 使用glob.sync第三方库来匹配路径
2. entry的key`[name]`, output的`[name]`和htmlWebpackPlugins的`chunks: [name]`这三个name是一一对应的
# 性能优化
1. tree Shaking[摇树]
    - `optimization: {usedExports: true}`
    - 只支持处理ES module的引入方式, 检测import的文件，按引用，使用编译
    - 同时在package.json设置`"sideEffects": ["*.css"]`, 表示不检测css文件的import
2. development和Production模式区分打包
    - 借用webpack-merge: `npm i webpack-merge -D`
    ```javascript
    // webpack.common.js
    module.exports = env => {
        if (env && env.production) {
            return merge(commonConfig, prodConfig);
        } else {
            return merge(commonConfig, devConfig);
        }
    }
    ```
    ```json
    {
        "dev": "webpack --config ./build/webpack.common.js",
        "prod": "webpack --env.production --config ./build/webpack.common.js",
    }
    ```
3. code splitting[代码分离]
    - 3.1 使用场景：代码分离是 webpack 中最引人注目的特性之一。此特性能够把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 bundle，以及控制资源加载优先级，如果使用合理，会极大影响加载时间。
    - 3.2 方式, 常用的代码分离方法有三种
        - 3.2.1 入口起点：使用 entry 配置手动地分离代码
        - 3.2.2 防止重复：使用 SplitChunksPlugin 去重和分离 chunk：`optimization: {splitChunks: {chunks: 'all'}}`
        - 3.3.3 动态导入：通过模块的内联函数调用来分离代码
            - 普通动态导入：使用ES6的inport()语法
            - 预获取/预加载模块[prefetch和preload]
                - preload chunk 会在父 chunk 加载时，以并行方式开始加载。prefetch chunk 会在父 chunk 加载结束后开始加载
                - preload chunk 具有中等优先级，并立即下载。prefetch chunk 在浏览器闲置时下载
    - 3.3 打包分析：在package.json文件的打包命令后面加参数`--profile --json > stats.json`,比如：`"bunnle": "npx webpack --profile --json > stats.json"`
# 原理
1. 原理简析：实行一个self_require来实现自己的模块化，代码文件以对象传进来，key是路径，value是包裹的代码字符串，并且代码内部的require，都被替换成了self_require
2. 实现步骤
    - 2.1 模块分析：读取入口文件，分析代码[包括文件名，依赖模块，代码]
        - getAst：借助`npm i @babel/parser -D`得到入口文件的一个抽象语法树
        ```javascript
        const parser = require("@babel/parser")
        const content = fs.readFileSync(entry, 'utf-8')
        const ast = parser.parse(content, {
            sourceType: 'module'
        })
        ```
        - getDependcies：借助`npm i @babel/traverse -D`遍历入口文件的依赖文件
        ```javascript
        const traverse = require("@babel/traverse").default
        const dependcies = {}
        traverse(ast, {
            ImportDeclaration({ node }) {
                const newPath = "./" + path.join(path.dirname(filename), node.source.value)F
                dependcies[node.source.value] = newPath
            }
        })
        ```
        - getCode：借助`npm i @babel/core  @babel/preset-env -D`,把代码处理成浏览器可运行的代码
        ```javascript
        const { transformFromAst } = require("@babel/core")
        const { code } = transformFromAst(ast, null, {
            presets: ["@babel/preset-env"]
        })
        ```
    - 2.2 遍历依赖模块,分析依赖模块
    - 经过上面两个步骤得到一个模块信息对象
    ```javascript
    this.moduleInfoArr.forEach(item => {
        moduleInfoObj[item.filename] = {
            dependcies: item.dependcies,
            code: item.code
        }
    })
    ```
    - 2.3 生成代码：`this.file(moduleInfoObj)`
        - 得到输出目录: `const outputPath = path.join(this.output.path, this.output.filename)`
        - 解析代码中的require和exports, 并用eval执行代码
        ```javascript
        const codeStr = JSON.stringify(moduleInfoObj)
        const bundle = `(function(graph){
            function require(module){
                function localrequire(relativePath){
                    return require(graph[module].dependcies[relativePath])
                }
                var exports = {};
                (function(require,exports,code){
                    eval(code)
                })(localrequire,exports,graph[module].code)
                return exports
            }
            require('${this.entry}')
        })(${codeStr})`
        ```
        - 生成文件: `fs.writeFileSync(outputPath, bundle, 'utf-8')`
3. 如何编写一个loader
    - `module.exports = function (source) {}`
    - Loader是一个声明式函数，不能用箭头函数，必须有返回值（处理后的源代码）
    - source参数表示源代码
    - this.query: 接收参数
    - this.callback: 返回多个信息
    - this.async: 处理异步
    - 多个loader：顺序从下到上，从右到左
    - loader的路径问题：`resolveLoader: {module: ['node_modules', './loader]}`
4. 如何编写一个plugins

