// 字符串拓展
// 1. 字符串模板
const name = 'xu'
console.log(`My name is ${name}`) //My name is xu

// 2. 两种新的字符串方法
const phone = `135...`
if (phone.startsWith(`135`)) console.log('移动')
const file = `file.txt`
if (file.endsWith('.txt')) console.log(`文本`)