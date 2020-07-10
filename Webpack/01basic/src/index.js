// 测试各种loader
import './index.css'
import './index.less'
import './index.scss'
// import logo from './logo.png'
// var img = new Image()
// img.src = logo //logo其实是路径
// img.classList.add("logo")
// var root = document.getElementById("root")
// root.prepend(img)

// 测试devServer的代理
// import './pages/proxyTest'
// 测试devServer的HMR
// import './pages/CSSHMRTest'
// import number from './pages/JSHMRTest.js'
// number()
// if (module.hot) {
//     module.hot.accept('./pages/JSHMRTest.js', function () {
//         document.getElementById("root").removeChild(document.getElementById("number"))
//         number()
//     })
// }

// 测试babel处理es6
// import "@babel/polyfill"
// import './pages/babelES6Test.js'
// 测试babel处理react
import './pages/babelReactTest.jsx'
// 测试 resolve.alias
// import '@/pages/babelReactTest.jsx'
// 测试babel处理vue
// import './pages/babelVueTest.js'
// 测试 resolve.extensions
// import '@/pages/babelVueTest'

// 测试性能优化之JS摇树
// import { myAdd } from './pages/treeShakingTest'
// console.log(myAdd(1, 2))
// 测试性能优化之代码分割
import './pages/codeSplittingTest'
// 测试性能优化之动态引入
// import './pages/dynamicImport'
