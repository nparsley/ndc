const request = require('request');


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoibmlja3BhcnNsZXkiLCJhIjoiY2tveGNnMW1vMGNrYzMwcXU0N2d0bzNtYiJ9.W_5haFNicW7b1TYzHLeNjA&limit=1'
    request({ url: url, json: true}, (error, response ) => {
        if (error) {
            callback('unable to connect to location services.', undefined)        
        } else if (response.body.features.length === 0) {
            callback('unable to find location. try another search.', undefined)
        } else {
            callback(undefined, {
                lat: response.body.features[0].center[1],
                lng: response.body.features[0].center[0],
                plc: response.body.features[0].place_name

            })
        }
    })
}




module.exports = geocode;
































































