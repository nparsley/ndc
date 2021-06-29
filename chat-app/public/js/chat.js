const socket = io()


socket.on('message', (test) => {
    console.log(test)
})

document.querySelector('#form').addEventListener('submit', (e) => {
    e.preventDefault()

    // const message = document.querySelector('input').value
    const message = e.target.elements.sendMessage.value
    // console.log('clicked')
    socket.emit('sendMessage', message)
})

document.querySelector('#send-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('geolocation is not supported by browser')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position)
        // console.log(position.coords.latitude, position.coords.longitude)

/*         let latitude = position.coords.latitude
        let longitude = position.coords.longitude
        let coordinates = { latitude, longitude } */
        // console.log(latitude, longitude)
        // console.log(coordinates)

        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    })
})









