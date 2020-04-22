// Js前端模块化规范
// 所谓模块化，是指模块的内部数据与实现是私有的, 只是向外部暴露一些接口(方法)与外部其它模块通信

// 1. CommonJS规范（同步加载模块）[Node]
// 特点：CommonJS规范主要用于服务端编程，加载模块是同步的，这并不适合在浏览器环境
// Demo如下 —— 
// 导出模块
//module1.js
module.exports = {
    msg: 'module1',
    showMsg() {
        console.log('from module1')
    }
}
//module2.js
module.exports = () => console.log('module2')
//module3.js
exports.add = (a, b) => a + b
exports.arr = [1, 2]
// 引入模块
const module1 = requle('./module1')
const module2 = requle('./module2')
const module3 = requle('./module3')
module1.msg //module1
module1.showMsg() //from module1
module2() //module2
module3.add(1, 2) //3
module3.arr //[1,2]

// 2. AMD（异步加载模块）[require.js]
// 特点：依赖前置，提前执行
// Demo如下 —— 
// 定义没有依赖的模块
// dataService.js
define(function () {
    const msg = 'hello'
    const showMsg = () => msg.toUpperCase()
    return { showMsg }
})
// 定义有依赖的模块
//alerter.js文件
define(['dataService', 'jQuery'], function (dataService, $) {
    const name = 'xu'
    const showName = name => dataService.showMsg() + name
    return { showName }
    $(body).hide()
})
// main.js文件
(function () {
    require.config({
        baseUrl: 'js/', //基本路径 出发点在根目录下
        paths: {
            //自定义模块
            alerter: './modules/alerter', //此处不能写成alerter.js,会报错
            dataService: './modules/dataService',
            // 第三方库模块
            jquery: './libs/jquery-1.10.1' //注意：写成jQuery会报错
        }
    })
    require(['alerter'], function (alerter) {
        alerter.showName()
    })
})()

// 3. CMD规范（异步加载模块）[sea.js]
// 特点：依赖就近，延迟执行
// Demo如下 —— 
// module1.js文件
define(function (require, exports, module) {
    //内部变量数据
    var data = 'atguigu.com'
    //内部函数
    function show() {
        console.log('module1 show() ' + data)
    }
    //向外暴露
    exports.show = show
})
// module2.js文件
define(function (require, exports, module) {
    module.exports = {
        msg: 'I from module2'
    }
})
// module3.js文件
define(function (require, exports, module) {
    const API_KEY = 'abc123'
    exports.API_KEY = API_KEY
})
// module4.js文件
define(function (require, exports, module) {
    //引入依赖模块(同步)
    var module2 = require('./module2')
    function show() {
        console.log('module4 show() ' + module2.msg)
    }
    exports.show = show
    //引入依赖模块(异步)
    require.async('./module3', function (m3) {
        console.log('异步引入依赖模块3  ' + m3.API_KEY)
    })
})
// main.js文件
define(function (require) {
    var m1 = require('./module1')
    var m4 = require('./module4')
    m1.show() // module1 show() atguigu.com
    m4.show()
    // module4 show() I from module2
    // 异步引入依赖模块3  abc123
})

// 4. ES6模块化[前后端通用]
// 特点：ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案
// Demo如下 —— 
// 暴露模块:方法一
// export.js
const num = 0
const add = (a, b) => a + b
export { num, add }
// 引入模块:方法一
// import.js
import { num, add } from './export'
console.log(num) //0
add(1, 2) //3
// 暴露模块方法二
// export-default.js
export default function () {
    console.log('foo')
}
// import-default.js
import suiBian from 'export-default'
suiBian() //foo