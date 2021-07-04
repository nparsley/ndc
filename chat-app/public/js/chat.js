const socket = io()

// elements
const $messageForm = document.querySelector('#form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')

const $locationForm = document.querySelector('#send-location')

const $messages = document.querySelector('#messages')
// const $locations= document.querySelector('#locations')


// templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-template').innerHTML

// options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })


socket.on('message', (test) => {
    console.log(test)
    const html = Mustache.render(messageTemplate, {
        username: test.username,
        message: test.text,
        createdAt: moment(test.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

socket.on('locationMessage', (message) => {
    console.log(message)
    const map = Mustache.render(locationTemplate, {
        username: message.username,
        url: message.url,
        createdAt: moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', map)
})

$messageForm.addEventListener('submit', (e) => {
// document.querySelector('#form').addEventListener('submit', (e) => {
    e.preventDefault()
    //disable form
    $messageFormButton.setAttribute('disabled', 'disabled')
    // const message = document.querySelector('input').value
    const message = e.target.elements.sendMessage.value
    // console.log('clicked')

    socket.emit('sendMessage', message, (error) => {
        // enable after sent
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()

        if (error) {
            return console.log(error)
        }

        console.log('message delivered')
    })
})

// document.querySelector('#send-location').addEventListener('click', () => {
$locationForm.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('geolocation is not supported by browser')
    }

    //disable location
    $locationForm.setAttribute('disabled', 'disabled')

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
        }, (error) => {
            if (error) {
                return console.log('error')
            }

            console.log('location shared')

            $locationForm.removeAttribute('disabled')
        })
    })
})


socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error)
        location.href = '/'
    }
})







