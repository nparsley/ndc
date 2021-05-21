const request = require('request');

const forecast = (lat, lng, callback) => {
    // const url = 'http://api.weatherstack.com/current?access_key=af60388571866aecc57b341911761233&query=' + encodeURIComponent(forecast)
    const url = 'http://api.weatherstack.com/current?access_key=af60388571866aecc57b341911761233&query=' + lat + ',' + lng + '&units=f'
    request({ url: url, json: true}, (error, response) => {
        if(error) {
            callback('unable to find location services', undefined)
        } else if (response.body.error) {
            callback('unable to find location. try another search.', undefined)
        } else {
            callback(undefined, {
                forecast: `${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees out. There is a ${response.body.current.precip}% chance of rain.`
            })
        }
    })


}

module.exports = forecast;