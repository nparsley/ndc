const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.port || 3000

// MIDDLEWARE - 1st  
/* app.use((req, res, next) => {
    // console.log(req.method, req.path)
    // next() 
    if (req.method === 'GET') {
        res.send('GET requests are disabled')
    } else {
        next()
    }
}) */


/* app.use((req, res, next) => {
    res.status(503).send('site is under maintenace')
    // if (req.method) {
    //     res.status(503).send('site is under maintenace')
    // } else {
    //     next()
    // }
}) */

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)



app.listen(port, () => {
    console.log('server is up on port ' + port)
})



const jwt = require('jsonwebtoken')

const myFunction = async () => {
    const token = jwt.sign({ _id: 'abc123' }, 'thisisnewcourse', { expiresIn: '7 days' })
    console.log(token)

    const data = jwt.verify(token, 'thisisnewcourse')
    console.log(data)

}

myFunction()



























































































