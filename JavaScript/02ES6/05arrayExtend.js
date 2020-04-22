// 数组的拓展
// 1. 六种方法
const arr = [1,2,3,4]

// 1.1 map：映射
const mapArr = arr.map(item => item + 1)
console.log(mapArr) //[ 2, 3, 4, 5 ]
// 1.2 forEach: 遍历
arr.forEach(item => console.log(item + 2)) //3 4 5 6
// map vs forEach
// map对数组每一项进行操作，并返回新数组，不改变原数组
// forEach对数组每一项进行操作，但没有返回值，不改变原数组

// 1.3 filter: 过滤
const filterArr = arr.filter(item => item > 2)
console.log(filterArr) //[3, 4]
// 1.4 find: 查找
const findItem = arr.find(item => item > 2)
console.log(findItem) //3
// filter vs find
// filter把所有符合条件的数组项都找出来，返回新数组
// find把符合条件的第一个数组项找出来，返回单独的一项

// 1.5 reduce: 汇总
const avg = arr.reduce((pre, next, index) => {
    if (index < arr.length - 1) {
        return pre + next
    } else {
        return (pre + next)/arr.length
    }
})
console.log(avg) //2.5

// 1.6 Array.from: 把类数组转化成数组
// eg: 统计一个HTML页面有多少个标签
const nodes = Array.from(document.querySelectorAll('*')).map(v => v.tagName)
console.log(nodes.length)
// 2 新的数据结构 Set
// 它类似于数组，但是成员的值都是唯一的，没有重复的值
// eg: 统计一个HTML页面有多少种标签
const tags = [...document.querySelectorAll('*')].map(v => v.tagName)
console.log(new Set(tags).size)
