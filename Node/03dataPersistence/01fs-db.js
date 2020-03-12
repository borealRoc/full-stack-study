// 实现⼀个⽂件系统读写数据库
const fs = require('fs')
const fsDBFile = './fsDB.json'

const get = key => {
    fs.readFile(fsDBFile, (err, data) => {
        if (err) err
        const json = JSON.parse(data)
        console.log(json[key])
    })
}
const set = (key, val) => {
    fs.readFile(fsDBFile, (err, data) => {
        if (err) err
        const json = data? JSON.parse(data): {}
        json[key] = val
        fs.writeFile(fsDBFile, JSON.stringify(json), err => {
            if (err) err
            console.log('写入成功')
        })
    })
}

// 命令⾏接⼝部分
const readline = require("readline")
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
rl.on("line", function (input) {
    const [op, key, value] = input.split(" ")
    if (op === 'get') {
        get(key)
    } else if (op === 'set') {
        set(key, value)
    } else if (op === 'quit') {
        rl.close()
    } else {
        console.log('没有该操作')
    }
})
rl.on("close", function () {
    console.log("程序结束")
    process.exit(0)
})