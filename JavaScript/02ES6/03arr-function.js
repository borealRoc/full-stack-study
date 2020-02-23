// 箭头函数
// 1、如果有且仅有一个参数，参数的()可以省略
// 2、如果函数体只有一句话，并且是return，函数体的{}和‘return’都可以省略
const dobuleA = a => a * 2
console.log(dobuleA(2)) //4

// 3、无法访问argumetnts
const showArgLength = (a, b, c) => { console.log(arguments.length) }
showArgLength(1, 2, 3) //Uncaught ReferenceError: arguments is not defined

// 4、this恒定：根据所在的环境定(定义在谁身上，this就指定谁)
// 4.1、什么叫所在的环境
// 4.1.1、没有定义时，一般是指window
document.onclick = () => alert(this) //[object Window]

// 4.2.2、有定义时，定义在谁身上，this就指定谁
document.onclick = () => {
    const arr = [1, 2]
    arr.show = () => alert(this)
    arr.show() //[object Window]
}
document.onclick = function () {
    const arr = [1, 2]
    arr.show = () => alert(this)
    arr.show() //[object HTMLDocument]
}
const obj = {
    a: 1,
    b: 2,
    c: 3,
    show: () => {
        alert(this) //[object Window]
    },
    showA: function () {
        console.log(this.a) //1
    },
    // showB的写法等同于showA
    showB() {
        console.log(this.b) //2
    },
    showC: function () {
        setTimeout(() => {
            console.log(this.c)
        }, 100)
    }
}
// 4.2、this指向恒定，即使用bind,也无法改变箭头函数的this
window.name = 'sun'
window.age = 20
const per = {
    name: 'xu',
    age: 17
}
const obj = {
    name: 'liu',
    age: 18,
    showName() {
        console.log(this.name) //'liu'
    },
    showPerName() {
        obj.showName.bind(per)() //'xu'
    },
    showAge: () => {
        console.log(this.age) // 20
    },
    showPerAge: () => {
        obj.showAge.bind(per)() //20
    },
}