const express = require('express')
const http = require('http')
const path = require ('path')
const socketio = require('socket.io')
const Filter = require('bad-words')

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


    socket.emit('message', 'welcome')
    socket.broadcast.emit('message', 'a new user has joined')

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed')
        }

        io.emit('message', message)
        callback()
    })

    socket.on('sendLocation', (coordinates, callback) => {
        // io.emit('message', `Location: ${coordinates.latitude}, ${coordinates.longitude}`)
        io.emit('message', `https://google.com/maps?q=${coordinates.latitude},${coordinates.longitude}`)
        callback()
    })

    socket.on('disconnect', () => {
        io.emit('message', 'a user has left')
    })



})



// app.listen(port, () => {
server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})






