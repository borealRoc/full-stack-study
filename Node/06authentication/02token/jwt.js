// jsonwebtoken.js
const jsonwebtoken = require('jsonwebtoken')
const secret = '12345678'
const opt = {
    secret: 'jwt_secret',
    key: 'user'
}
const user = {
    username: 'xu',
    password: '123456'
}
const token = jsonwebtoken.sign({
    data: user,
    // 设置 token 过期时间
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
}, secret)
console.log('⽣成token:' + token)
// ⽣成
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoieHUiLCJwYXNzd29yZCI6IjEyMzQ1NiJ9LCJleHAiOjE1OTg4NjAyMzgsImlhdCI6MTU5ODg1NjYzOH0.F1HBJtinIxK1nmcsVBLfzR1fGF_c8UvRQeueDsO5RmA
console.log('解码:', jsonwebtoken.verify(token, secret, opt))
// 解码
// { 
//   data: { username: 'xu', password: '123456' },
//   exp: 1598860255,
//   iat: 1598856655 
// }