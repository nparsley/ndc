const socket = io()

// socket.on('countUpdated', (count) => {
//     console.log('the count has been updated', count)
// })

// document.querySelector('#increment').addEventListener('click', () => {
//     console.log('clicked')
//     socket.emit('increment')
// })

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