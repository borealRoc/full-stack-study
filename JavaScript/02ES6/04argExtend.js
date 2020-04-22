// 函数参数扩展与扩展符号...
// 1. 函数参数扩展
// 1.1 默认参数
const show = (a = 1,b = 2, c = 3) => console.log(a, b, c)
show(4) //4, 2, 3

// 1.2 2、剩余参数：剩余参数的...必须放在最后
const add = (a, b, ...more) => more.reduce((m,n) => m + n) + a + b //more是数组
add(1, 2, 3, 4, 5) //15

// 2. 扩展符号...
// 2.1 扩展对象
const obj1 = {a: 1}
const obj2 = {...obj1, b: 2}
// 等价于 
const obj3 = Object.assign({}, obj1, {b: 2})
console.log(obj2) //{ a: 1, b: 2 }
console.log(obj3) //{ a: 1, b: 2 }

// 2.2 扩展数组
// eg: 统计一个HTML页面有多少种标签
const nodes = [...document.querySelectorAll('*')].map(v => v.tagName)
const result = new Set(nodes).size
