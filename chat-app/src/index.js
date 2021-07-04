const express = require('express')
const http = require('http')
const path = require ('path')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')
const { addUser, getUser, getUsersInRoom, removeUser } = require('./utils/users') 

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





    socket.on('join', ({ username, room }, callback) => {
        const { error, user} = addUser({ id: socket.id, username, room })

        if (error) {
            return callback(error)
        }


        socket.join(user.room)

        socket.emit('message', generateMessage('admin', 'welcome'))
        socket.broadcast.to(user.room).emit('message', generateMessage('admin', `${user.username} has joined`))

        callback()


        // io.toemit -- emits event to everyone in specific room
        // socket.broadcast.to.emit -- send event to everyone except client but to specific chat room
    })

    socket.on('sendMessage', (message, callback) => {
        //use get user to fetch by socket id

        const user = getUser(socket.id)

        const filter = new Filter()

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed')
        }

        io.to(user.room).emit('message', generateMessage(user.username, message))
        callback()
    })

    socket.on('sendLocation', (coordinates, callback) => {
        
        const user = getUser(socket.id)

        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?q=${coordinates.latitude},${coordinates.longitude}`))
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', generateMessage('admin', `${user.username} has left`))
        }
    })


})


server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})






