const fs = require('fs')
const path = require('path')

const { getAst, getDependcies, getCode } = require("./parser")

module.exports = class Compiler {
    constructor(opts) {
        const { entry, output } = opts
        this.entry = entry
        this.output = output
        this.moduleInfoArr = []
    }
    // 执行编译
    run() {
        // step1: 拿到webpack.config参数，分析入口文件[index.js]: 文件名，依赖， 代码
        const info = this.build(this.entry)
        console.log('info', info)
        // info {
        //     filename: './src/index.js',
        //     dependcies: { './b.js': './src/b.js' },
        //     code: '"use strict";\n' +
        //       '\n' +
        //       'var _b = require("./b.js");\n' +
        //       '\n' +
        //       "console.log((0, _b.b)('史诗王爵'));"
        //   }
        this.moduleInfoArr.push(info)

        // step2: 遍历依赖文件，分析依赖文件: 文件名，依赖， 代码
        for (let i = 0; i < this.moduleInfoArr.length; i++) {
            const item = this.moduleInfoArr[i]
            const { dependcies } = item
            if (dependcies) {
                for (let j in dependcies) {
                    this.moduleInfoArr.push(this.build(dependcies[j]))
                }
            }
        }
        console.log('this.moduleInfoArr', this.moduleInfoArr)
        // this.moduleInfoArr [
        //     {
        //       filename: './src/index.js',
        //       dependcies: { './b.js': './src/b.js' },
        //       code: '"use strict";\n' +
        //         '\n' +
        //         'var _b = require("./b.js");\n' +
        //         '\n' +
        //         "console.log((0, _b.b)('史诗王爵'));"
        //     },
        //     {
        //       filename: './src/b.js',
        //       dependcies: { './a.js': './src/a.js' },
        //       code: '"use strict";\n' +
        //         '\n' +
        //         'Object.defineProperty(exports, "__esModule", {\n' +
        //         '  value: true\n' +
        //         '});\n' +
        //         'exports.b = b;\n' +
        //         '\n' +
        //         'var _a = require("./a.js");\n' +
        //         '\n' +
        //         'function b(name) {\n' +
        //         '  return "hello" + name + (0, _a.a)("webpack");\n' +
        //         '}'
        //     },
        //     {
        //       filename: './src/a.js',
        //       dependcies: {},
        //       code: '"use strict";\n' +
        //         '\n' +
        //         'Object.defineProperty(exports, "__esModule", {\n' +
        //         '  value: true\n' +
        //         '});\n' +
        //         'exports.a = a;\n' +
        //         '\n' +
        //         'function a(name) {\n' +
        //         '  return name.toUpperCase();\n' +
        //         '}'
        //     }
        //   ]

        //step3: 格式转化，数组转对象
        const moduleInfoObj = {}
        this.moduleInfoArr.forEach(item => {
            moduleInfoObj[item.filename] = {
                dependcies: item.dependcies,
                code: item.code
            }
        })
        console.log('moduleInfoObj', moduleInfoObj)
        // moduleInfoObj {
        //     './src/index.js': {
        //       dependcies: { './b.js': './src/b.js' },
        //       code: '"use strict";\n' +
        //         '\n' +
        //         'var _b = require("./b.js");\n' +
        //         '\n' +
        //         "console.log((0, _b.b)('史诗王爵'));"
        //     },
        //     './src/b.js': {
        //       dependcies: { './a.js': './src/a.js' },
        //       code: '"use strict";\n' +
        //         '\n' +
        //         'Object.defineProperty(exports, "__esModule", {\n' +
        //         '  value: true\n' +
        //         '});\n' +
        //         'exports.b = b;\n' +
        //         '\n' +
        //         'var _a = require("./a.js");\n' +
        //         '\n' +
        //         'function b(name) {\n' +
        //         '  return "hello" + name + (0, _a.a)("webpack");\n' +
        //         '}'
        //     },
        //     './src/a.js': {
        //       dependcies: {},
        //       code: '"use strict";\n' +
        //         '\n' +
        //         'Object.defineProperty(exports, "__esModule", {\n' +
        //         '  value: true\n' +
        //         '});\n' +
        //         'exports.a = a;\n' +
        //         '\n' +
        //         'function a(name) {\n' +
        //         '  return name.toUpperCase();\n' +
        //         '}'
        //     }
        //   }

        // step4: 生成构建代码
        this.file(moduleInfoObj)
    }
    // 分析文件
    build(filename) {
        let ast = getAst(filename)
        let dependcies = getDependcies(ast, filename)
        let code = getCode(ast)
        return {
            filename,
            dependcies,
            code
        }
    }
    // 文件生成
    file(code) {
        // step1: 得到输出目录
        const outputPath = path.join(this.output.path, this.output.filename)
        console.log('outputPath', outputPath)
        // outputPath /Users/xusp/Desktop/studySpace/full-stack-study/Webpack/03webpack_theory/dist/main.js

        // step2: 解析代码中的require和exports, 并用eval执行代码
        const codeStr = JSON.stringify(code)
        console.log('codeStr', codeStr)
        // codeStr {"./src/index.js":{"dependcies":{"./b.js":"./src/b.js"},"code":"\"use strict\";\n\nvar _b = require(\"./b.js\");\n\nconsole.log((0, _b.b)('史诗王爵'));"},"./src/b.js":{"dependcies":{"./a.js":"./src/a.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.b = b;\n\nvar _a = require(\"./a.js\");\n\nfunction b(name) {\n  return \"hello\" + name + (0, _a.a)(\"webpack\");\n}"},"./src/a.js":{"dependcies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.a = a;\n\nfunction a(name) {\n  return name.toUpperCase();\n}"}}
        const bundle = `(function(graph){
            //  1. 解析require
            function require(module){
                // 1.2 解析模块内部的require, 把相对路径转化成项目下的绝对路径
                function localrequire(relativePath){
                   return require(graph[module].dependcies[relativePath])
                }
                // 1.3 解析exports，将其定义为一个对象
                var exports = {};
                // 1.1 定义一个自执行函数，用eval的形式执行每个模块的代码
                (function(require,exports,code){
                    eval(code)
                })(localrequire,exports,graph[module].code)
                return exports
            }
            // 2. 执行require，打包的第一步就是先解析入口文件
            require('${this.entry}')
          })(${codeStr})`

        // step3: 生成文件
        fs.writeFileSync(outputPath, bundle, 'utf-8')
    }
}