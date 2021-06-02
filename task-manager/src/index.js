const express = require('express')
require('./db/mongoose')
const User = require('./models/user')

const app = express()
const port = process.env.port || 3000

app.use(express.json())

app.post('/users', (req, res) => {
    // console.log(req.body)
    // res.send('testing')

    const user = new User(req.body)

    user.save().then(() => {
        res.send(user)
    }).catch((e) => {
        res.status(400).send(e)
        // res.send(e)
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})































































































