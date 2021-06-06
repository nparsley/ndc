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




// BCRYPT EX

const bcrypt = require('bcryptjs')

const myFunction = async () => {
    const password = 'red12345!' // plain text password
    const hashedPassword = await bcrypt.hash(password, 8)


    console.log(password)
    console.log(hashedPassword)


    //login password match
    const isMatch = await bcrypt.compare('red12345!', hashedPassword)
    console.log(isMatch)

}

myFunction()



























































































