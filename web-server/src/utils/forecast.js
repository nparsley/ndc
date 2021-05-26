const request = require('request');

const forecast = (lat, lng, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=af60388571866aecc57b341911761233&query=' + lat + ',' + lng + '&units=f'
    request({ url, json: true}, (error, {body}) => {
        if(error) {
            callback('unable to find location services', undefined)
        } else if (body.error) {
            callback('unable to find location. try another search.', undefined)
        } else {
            callback(undefined,
                `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. There is a ${body.current.precip}% chance of rain.`
            )
        }
    })



}

module.exports = forecast;