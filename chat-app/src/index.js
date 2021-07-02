const express = require('express')
const http = require('http')
const path = require ('path')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')

const app = express()
//express does this behind scenes
const server = http.createServer(app)
//call socketio as a function to config to work with server
const io = socketio(server)

const port = process.env.port || 3000
const publicDiretoryPath = path.join(__dirname, '../public')


app.use(express.static(publicDiretoryPath))



io.on('connection', (socket) => {
    console.log('new websocket connection')





    socket.on('join', ({ username, room }) => {
        socket.join(room)

        socket.emit('message', generateMessage('welcome'))
        socket.broadcast.to(room).emit('message', generateMessage(`${username} has joined`))


        // io.toemit -- emits event to everyone in specific room
        // socket.broadcast.to.emit -- send event to everyone except client but to specific chat room
    })

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed')
        }

        io.to('phx').emit('message', generateMessage(message))
        callback()
    })

    socket.on('sendLocation', (coordinates, callback) => {
        io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${coordinates.latitude},${coordinates.longitude}`))
        callback()
    })

    socket.on('disconnect', () => {
        io.emit('message', generateMessage('a user has left'))
    })


})


server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})






