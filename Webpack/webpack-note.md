# 基础语法
1. 定义：模块打包工具
2. 安装：推荐局部安装 `npm i webpack webpack-cli -D`
3. 启动: `npx webpack` npx会在项目的node_modules里面查找webpack
3. 零配置
    - 只定义入口，出口和模式
    - 只能识别js和json文件
# 核心概念
1. 入口[entry]
    - 1.1 单入口：字符串 `entry: './src/index.js'`
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
    - 3.1 production：帮助模块压缩, 处理副作用（JS摇树）
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
        - babel-loader: 编译es6, react
        - 处理.Vue单文件：`npm i vue-loader vue-template-compiler`
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
## 一、优化开发体验 -- 打包构建速度
## 二、优化输出质量 -- 线上文件体积
1. 缩小loader文件范围: 推荐用include
    - include: `include: path.resolve(__dirname, "./src")`
    - exclude: `exclude: /node_modules/`
2. 优化resolve配置
    - Tips：在webpack中，查找绝对路径比查找相对路径快很多，所以能用绝对路径的地方就不要用相对路径!
    - 2.1 resolve.modules: 用于配置wepack去哪个目录下查找第三方模块 `modules: [path.resolve(__dirname, "./node_modules")]`
    - 2.1 resolve.alias: 通过别名将原导入路径映射成一个新的导入路径 `alias: {"react": path.resolve(__dirname, "./node_modules/react/umd/react.production.min.js"),}`
    - 2.1 resolve.extensions: 在导入语句没有后缀时，webpack会自动带上后缀，去尝试查找文件是否存在 `extensions: [".js"]`
3. 配置 externals 让 webpack 不打包某些引用库
    ```html
    <!-- main.html -->
    <!-- 我们希望在使⽤时，仍然可以通过 import 的⽅式去引⽤(如 import $ from 'jquery' )，并且希望 webpack 不会对其进⾏打包，此时就可以配置 externals  -->
    <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
    ```
    ```javascript
    externals: {
        //jquery通过script引⼊之后，全局中即有了 jQuery 变量
        'jquer': jQuery
    }
    ```
3. 使用静态资源路径publicPath(CDN)
    - `output: {publicPath: '存放JS文件的CDN地址'} `
4. css文件的处理
    - 使用less或者sass当做css技术栈
    - 使用postcss为样式自动补齐浏览器前缀
    - 借助MiniCssExtractPlugin抽离css,单独生成css，css和js可以并行加载，提高页面加载效率
    - 借助optimize-css-assets-webpack-plugin和cssnano压缩css
5. 压缩HTML：借助html-webpack-plugin `new htmlWebpackPlugin({minify: {}})`
6. development和Production模式区分打包
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
7. Tree Shaking[摇树]
    - 7.1 CSS Tree Shaking: `npm i glob-all purify-css purifycss-webpack --save-dev`
    - 7.2 JS Tree Shaking: `optimization: {usedExports: true}`
        - 只支持处理ES module的引入方式, 检测import的文件，只编译引用部分
        - 同时在package.json设置`"sideEffects": ["*.css"]`, 表示不检测css文件的import
        - JS Tree Shaking 在开发模式下是不生效的，因为为了方便调试
        - 生产模式自动帮助开启JS摇树
8. code splitting[代码分离]
    - 8.1 使用场景：代码分离是 webpack 中最引人注目的特性之一。此特性能够把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 bundle，以及控制资源加载优先级，如果使用合理，会极大影响加载时间。
    - 8.2 方式, 常用的代码分离方法有三种
        - (1) 入口起点：使用 entry 配置多入口，从而打包出多出口，手动地分离代码
        - (2) 防止重复：使用 SplitChunksPlugin 去重和分离 chunk：`optimization: {splitChunks: {chunks: 'all'}}`
        - (3) 动态导入：使用ES6的inport()语法
        ```javascript
        document.addEventListener('click', () => {
            import(/* webpackPrefetch: true */"./click.js").then(({ default: func }) => { 
                //需要用到 npm install --save-dev @babel/plugin-syntax-dynamic-import 
                func()
            })
        })
        ```
        - (4) 通过魔法注释预获取/预加载模块[prefetch和preload]
            - `/* webpackPrefetch: true*/`
            - `/* webpackPreload: true*/`
            - 在声明 import 时，使用下面的内置指令，可以让 webpack 输出 "resource hint(资源提示)"，来告知浏览器
            - preload chunk 会在父 chunk 加载时，以并行方式开始加载。prefetch chunk 会在父 chunk 加载结束后开始加载
            - preload chunk 具有中等优先级，并立即下载。prefetch chunk 在浏览器闲置时下载
        ```javascript
        document.addEventListener('click', async () => {
            const element = document.createElement('div')
            const { default: _ } = await import(/* webpackChunkName: "lodash" *//* webpackPrefetch: true */'lodash')
            element.innerHTML = _.join(['Hello', 'webpack'], '**')
            document.body.appendChild(element)
        })
        ```
    - 8.3 打包分析：在package.json文件的打包命令后面加参数`--profile --json > stats.json`,比如：`"bunnle": "npx webpack --profile --json > stats.json"`
9. DllPlugin插件打包第三类库优化构建性能
    - 项目中引入很多第三方库，这些库在很长的时间内，基本不会更新，打包的时候分开打包来提升打包速度，DllPlugin动态链接库插件， 其原理就是把依赖的基础模块抽离出来打包到dll文件中，当需要导入的模块存在于某个dll中时，这个模块不再被打包，而是去dll中获取。动态链接库，建议使用在开发模式下，它主要是用来优化构建速度的，线上推荐代码分割。
    - DllPlugin：用于打包出动态链接库文件（比如 react.mainfest.json和react.dll.js）
    - DllReferencePlugin：webpack 构建时，使用DllReferencePlugin读取mainfest.json文件，看看是否有第三方依赖以及它们在node_modules中的映射文件
    - add-asset-html-webpack-plugin：将我们打包后的 dll.js ⽂件注⼊到我们⽣成的 index.html 中
    ```javascript
    new AddAssetHtmlWebpackPlugin({
        filepath: path.resolve(__dirname, '../dll/react.dll.js') // 对应的 dll ⽂件路径
    }),
    ```
    - HardSourceWebpackPlugin: Webpack5中内置了dllplugin⼀样的优化效果
    ```javascript
    const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
    const plugins = [
        // 使⽤极其简单，想插件一样用
        new HardSourceWebpackPlugin()
    ]
    ```
10. 使用happypack并发执行任务
    - 运行在 Node 之上的Webpack是单线程的，Happy Pack 帮助Webpack将任务分解给多个子进程去并发执行，子进程处理完后再将结果发送给主进程。
    - `npm i happypack -D`
11. 使⽤⼯具量化
    - 11.1 `npm i speed-measure-webpack-plugin -D`:可以测量各个插件和 loader 所花费的时间
    ```javascript
    //webpack.config.js
    const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
    const smp = new SpeedMeasurePlugin();
    const config = {
        //...webpack配置
    }
    module.exports = smp.wrap(config);
    ```
    - 11.2 `npm install webpack-bundle-analyzer -D` 分析webpack打包后的模块依赖关系
    ```javascript
    //webpack.config.js
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    module.exports = {
        plugins: [
            new BundleAnalyzerPlugin()
        ]
    }
    ```
# 原理
1. 原理简析：实现一个self_require来实现自己的模块化，代码文件以对象传进来，key是路径，value是包裹的代码字符串【用eval执行】，并且代码内部的require，都被替换成了self_require
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
    - plugin是一个类, 里面包含一个apply函数，接收一个参数，compiler
    ```javascript
    class DemoWebpackPlugin {
        constructor(opt) {
            console.log('opt获取插件参数')
        }
        apply(compiler) {
            // hooks.emit 定义在某个时刻
            // 异步写法
            compiler.hooks.emit.tapAsync('DemoWebpackPlugin', (compilation, cb) =>{})
            // 同步写法
            compiler.hooks.compile.tap('DemoWebpackPlugin', compilation => {})
        }
    }
    ```
    
