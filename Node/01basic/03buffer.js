// 创建
// 分配存储空间: buffer长度不可变
const buf1 = Buffer.alloc(10)
console.log('buf1', buf1)
// 从数据创建
// Buffer.from(str/any...)
const buf2 = Buffer.from([0, 1, 10])
console.log('buf2', buf2)
// 直接创建
const buf3 = Buffer.from('hello,许')
console.log('buf3', buf3)

// 写入
buf1.write('hello')
console.log(buf1)

// 读取
console.log(buf3.toString())
console.log(buf3)

// 合并
const buf4 = Buffer.concat([buf2, buf3])
console.log('buf4', buf4)

