// 文件操作
const fs = require('fs')
const path = `./modules/rmb-turn.js`

// 1. 同步读取文件
const data1 = fs.readFileSync(path)
console.log('同步读取文件', data1)

// 2. 异步读取文件--回调函数写法
fs.readFile(path, (err, data2) => {
    if (err) return err
    console.log('异步读取文件--回调函数写法', data2)
})

// 3. 异步读取文件--promise写法
const { promisify } = require('util')
const readFile = promisify(fs.readFile)
readFile(path).then(data3 => console.log('异步读取文件--util模块的promisify写法', data3))
// fs Promises API -- v10.0
const { promises } = require('fs')
promises.readFile(path).then(data4 => console.log('异步读取文件--fs Promises API写法', data4))

// 4. 异步读取文件--generator写法
const readFilePromise = readFile(path)
// 借助第三方模块co
const co = require('co')
co(function* () {
    const res = yield Promise.resolve(readFilePromise)
    return res
}).then(data5 => console.log('异步读取文件--generator写法', data5), err => console.log('异步读取文件generator写法出错', err.stack))

// 5. 异步读取文件--async/await写法
const asyncReadFile = async () => {
    try {
        const data6 = await readFilePromise
        console.log('异步读取文件--async/await写法', data6)
    } catch (error) {
        console.log('异步读取文件出错--async/await写法', error)
    }
}
asyncReadFile()

console.log('测试一下我在哪里执行')