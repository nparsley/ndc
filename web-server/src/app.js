const path = require('path')
const express = require('express')
const hbs = require('hbs')
// const request = require('request');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

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
    const address = req.query.address;
    if (!address) {
        return res.send({
            error: 'address must be provided'
        })
    }

    geocode(address, (error, {lat, lng, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        } 
        forecast(lat, lng, (error, forecastData) => {
            if (error) {
                return res.send ({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })

/*     res.send([{
        location: 'Phoenix'
    }, {
        forecast: 'Sunny'
    }, {
        address: address
    }]) */

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }

    // console.log(req.query.search)
    res.send({
        products: []
    })
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







































