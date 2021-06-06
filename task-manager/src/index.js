const express = require('express')
require('./db/mongoose')
// const User = require('./models/user')
// const Tasks = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.port || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)



app.listen(port, () => {
    console.log('server is up on port ' + port)
})




// JSON WEB TOKEN EX

// const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const myFunction = async () => {
    const token = jwt.sign({ _id: 'abc123' }, 'thisisnewcourse', { expiresIn: '7 days' })
    console.log(token)

    const data = jwt.verify(token, 'thisisnewcourse')
    console.log(data)

}

myFunction()



























































































