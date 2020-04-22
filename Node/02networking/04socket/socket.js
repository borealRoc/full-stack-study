const http = require('http')
const io = require('socket.io')
const httpServer = http.createServer()
httpServer.listen(3000)
const wsServer = io.listen(httpServer)

wsServer.on('connection', socket => {
    // socket.on 接收
    socket.on('sendMsgFromClient', (...args) => {
        console.log('sendMsgFromClient', ...args)
    })
    // socket.emit 发送
    setInterval(() => {
        socket.emit('sendMsgFromServer', new Date().toLocaleTimeString())
    }, 1000)
})