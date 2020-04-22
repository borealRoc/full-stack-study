// 新的变量声明方式 let 和 const

// 1. let块级作用域的运用:for循环
// 1.1 i只在for循环体内有效，在循环体外引用就会报错
for (let i = 0; i < 3; i++) {

}
console.log(i) //ReferenceError: i is not defined

// 1.2 变量i是let声明的，当前的i只在本轮循环有效
let arr = []
for (let i = 0; i < 10; i ++) {
    arr[i] = () => console.log(i)
}
arr[2]() //2

// 1.3 for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域
for (let i = 0; i < 2; i ++) {
    let i = 'abc'
    console.log(i)
}
//abc
//abc

// 2. const也有块级作用域
{
    const a = 1
}
console.log(a) //ReferenceError: a is not defined