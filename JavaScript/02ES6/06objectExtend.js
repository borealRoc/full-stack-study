// 对象的扩展
// 1 简写，如果属性和值相同
const a = 1, b = 2
const newObj = {a, b} //等价于const newObj = {a: a, b: b}
console.log(newObj) //{ a: 1, b: 2 }

// 2 对象方法的'function'可以不写
const person = {
    name: 'xu',
    // sayName: function () {

    // },
    sayName() {
        console.log(this.name)
    }
}
person.sayName() //xu

// 3 类class与新的面向对象写法
class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    sayName() {
        console.log(this.name)
    }
    sayAge() {
        console.log(this.age)
    }
}
// extends: 继承方法
class Worder extends Person {
    constructor(name, age, job) {
        //super:超类（父类），继承属性
        super(name, age)
        this.job = job
    }
    sayJob() {
        console.log(this.job)
    }
}
const w = new Worder('xu', 17, '打杂')
w.sayName() //xu
w.sayAge() //17
w.sayJob() //打杂