const path = require('path')
const express = require('express')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()
const publicDirectory = path.join(__dirname, '../public')


app.use(express.static(publicDirectory))


/* app.get('', (req, res) => {
    res.send('<h1>Weather</h1>')
}) */

/* app.get('/help', (req, res) => {
    res.send([{
        name: 'nick'
    }, {
        name: 'andrew'
    }])
})

app.get('/about', (req, res) => {
    res.send('<h3>ABOUT</h3>')
}) */

app.get('/weather', (req, res) => {
    res.send([{
        location: 'Phoenix'
    }, {
        forecast: 'Sunny'
    }])
})


app.listen(3000, () => {
    console.log('server is up on port 3000')
})







































