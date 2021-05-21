const request = require('request');
const geocode = require('./utils/geocode')

/* const url = 'http://api.weatherstack.com/current?access_key=af60388571866aecc57b341911761233&query=37.8267,-122.4233&units=f'


request({ url: url, json: true }, (error, response) => {
    //error handling
    if(error) {
        console.log('unable to connect to weather service')
    } else if (response.body.error) {
        console.log('unable to find location')
    } else {
        console.log(`${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees out. There is a ${response.body.current.precip}% chance of rain.`)
    }

    // const data = JSON.parse(response.body);
    // console.log(data.current);

    // console.log(response.body.current);
    // console.log(`${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees out. There is a ${response.body.current.precip}% chance of rain.`)
}) */


// geocoding 
// address --> lat & long --> weather


/* const urlLA = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los&Angeles.json?access_token=pk.eyJ1Ijoibmlja3BhcnNsZXkiLCJhIjoiY2tveGNnMW1vMGNrYzMwcXU0N2d0bzNtYiJ9.W_5haFNicW7b1TYzHLeNjA&limit=1'


request({ url: urlLA, json: true}, (error, response) => {


    //error handling
    if (error) {
        console.log('unable to connect to weather service')
    } else if (response.body.features.length === 0) {
        console.log('invalid location')
    } else {
        const lat = response.body.features[0].center[1];
        const lng = response.body.features[0].center[0];
        console.log(lat, lng);
    }


    // const both = response.body.features[0].center[0, 1];

    // console.log(lat, lng);
    // console.log(both);
}) */




geocode('los angeles', (error, data) => {
    console.log('error', error)
    console.log('data', data)

})












































































































































































































































































































































































































































































