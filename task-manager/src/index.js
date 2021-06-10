const express = require('express')
require('./db/mongoose')
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


//find task by id
const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
    // const task = await Task.findById('60c2986112d70b2ecc4e0c08')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    const user = await User.findById('60c293f66d65432b9010c117')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}

main()
































































