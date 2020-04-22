// 解构赋值
// 1. 左右两边必须完全一样
let [a, b] = [1, 2]
let {c, d} = {c: 3, d: 4}
console.log(a, b) //1, 2
console.log(c, d) //3, 4

// 2、右边必须合法的东西
// let {e, f} = {5, 6}  //SyntaxError: Unexpected token ,

// 3、声明和赋值必须同时完成
let [h, i]
[h, i] = [7, 8] //Missing initializer in destructuring declaration

// 4、粒度
let arr = [1, {a: {m: 2, n: 3}, b: 4, c: 5}, 6]
let [a, b, c] = arr
console.log(a, b, c) //1 { a: { m: 2, n: 3 }, b: 4, c: 5 } 6
let [m, {a, b, c}, n] = arr
console.log(m, a, b, c, n) //1 { m: 2, n: 3 } 4 5 6