const btn = document.getElementById("cssHMRBtn")
btn.onclick = function () {
    var div = document.createElement("div")
    div.className = 'css-hmr'
    div.innerHTML = "item"
    document.body.appendChild(div)
}
