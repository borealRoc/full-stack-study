const http = require('http')
const io = require('socket.io')
const httpServer = http.createServer()
httpServer.listen(3000)
const wsServer = io.listen(httpServer)

const socketArr = []
const mesArr = []

wsServer.on('connection', socket => {
    socketArr.push(socket)
    console.log(socketArr)
    // socket.on('disconnect', () => {
    //     const n = socketArr.indexOf(socket)
    //     if (n !== -1) {
    //         socketArr.splice(n, 1)
    //     }
    // })

    socket.on('sendMes', res => {
        mesArr.push(res)
        socketArr.forEach(socketItem => {
            socketItem.emit('receiveMes', mesArr)
        })
    })
})
