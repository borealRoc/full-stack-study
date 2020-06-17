import './index.css'
import './index.less'
import './index.scss'
import logo from './logo.png'

var img = new Image()
img.src = logo //logo其实是路径
img.classList.add("logo")
var root = document.getElementById("root")
root.prepend(img)

console.log('hello webpack')

import axios from "axios"
axios.get("/api/info").then(res => {
    console.log(res.data)
});