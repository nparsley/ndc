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

























































