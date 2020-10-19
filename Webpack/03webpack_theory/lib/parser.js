const fs = require('fs')
const path = require("path")
// 分析文件内部语法，包括es6【比如，可以把import引入换成require语法】，返回一个ast抽象语法树
const parser = require("@babel/parser")
// 遍历出所有的引入模块
const traverse = require("@babel/traverse").default
// 把代码处理成浏览器可运行的代码，需要借助@babel/core，和 @babel/preset-env，把ast语法树转换成合适的代码
const { transformFromAst } = require("@babel/core")

module.exports = {
    // 模块分析：读取入口文件，分析代码
    getAst: filename => {
        const content = fs.readFileSync(filename, 'utf-8')
        console.log('content', content)
        // content import { b } from "./hello.js"
        // console.log(b('史诗王爵'))  
        const ast = parser.parse(content, {
            sourceType: 'module'
        })
        console.log('ast', ast)
        // ast Node {
        //     type: 'File',
        //     start: 0,
        //     end: 54,
        //     loc: SourceLocation {
        //       start: Position { line: 1, column: 0 },
        //       end: Position { line: 3, column: 0 }
        //     },
        //     errors: [],
        //     program: Node {
        //       type: 'Program',
        //       start: 0,
        //       end: 54,
        //       loc: SourceLocation { start: [Position], end: [Position] },
        //       sourceType: 'module',
        //       interpreter: null,
        //       body: [ [Node], [Node] ],
        //       directives: []
        //     },
        //     comments: []
        //   }
        return ast
    },
    getDependcies: (ast, filename) => {
        const dependcies = {}
        traverse(ast, {
            ImportDeclaration({ node }) {
                const newPath = "./" + path.join(path.dirname(filename), node.source.value);
                dependcies[node.source.value] = newPath
            }
        })
        console.log('dependcies', dependcies)
        // dependcies { './b.js': './src/b.js' }
        return dependcies
    },
    getCode: ast => {
        const { code } = transformFromAst(ast, null, {
            presets: ["@babel/preset-env"]
        })
        console.log('code', code)
        // code "use strict";

        // var _b = require("./b.js");

        // console.log((0, _b.b)('史诗王爵'));
        return code
    },
}