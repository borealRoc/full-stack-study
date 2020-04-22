// 基于Tcp协议建立一个简易聊天室
const net = require('net')
const server = net.createServer()
const clientList = []

server.on('connection', client => {
    client.write('Hi!\n')
    clientList.push(client)
    client.on('data', data => {
        clientList.forEach(c => {
            c.write(data)
        })
    })
})
server.listen(9000)

// 通过talnet连接服务器
// talnet localhost 9000