import './index.css'
import logo from './logo.png'

var img = new Image()
img.src = logo //logo其实是路径
img.classList.add("logo")
var root = document.getElementById("root")
root.append(img)

console.log('hello webpack')