import './index.css'
import './index.less'
import './index.scss'
import logo from './logo.png'
var img = new Image()
img.src = logo //logo其实是路径
img.classList.add("logo")
var root = document.getElementById("root")
root.prepend(img)

// import './pages/proxyTest'
import './pages/CSSHMRTest'
import number from './pages/JSHMRTest.js'
number()
if (module.hot) {
    module.hot.accept('./pages/JSHMRTest.js', function () {
        document.getElementById("root").removeChild(document.getElementById("number"))
        number()
    })
}

import "@babel/polyfill"
import './pages/babelES6Test.js'
import './pages/babelReactTest.jsx'

import { myAdd } from './pages/treeShakingTest'
console.log(myAdd(1, 2))