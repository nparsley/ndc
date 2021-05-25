const path = require('path')
const express = require('express')
const hbs = require('hbs')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

// define paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// handlebar setup engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectory))


app.get('', (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'nick'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about',
        name: 'nick'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        name: 'nick'
    })
})


app.get('/weather', (req, res) => {
    res.send([{
        location: 'Phoenix'
    }, {
        forecast: 'Sunny'
    }])
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'nick',
        error: 'help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'nick',
        error:'page not found'
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})







































