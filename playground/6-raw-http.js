const http = require('http');

const url = 'http://api.weatherstack.com/current?access_key=af60388571866aecc57b341911761233&query=45,-75&units=f'


const request = http.request(url, (response) => {

    let data = '';

    response.on('data', (chunk) => {
        data = data + chunk.toString()
        console.log(chunk)
    })

    response.on('end', () => {
        // console.log(data)
        const body = JSON.parse(data)
        console.log(body)
    })

})


//error
request.on('error', (error) => {
    console.log('an error', error)
})


// run finished request
request.end()























