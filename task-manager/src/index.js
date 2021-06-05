const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Tasks = require('./models/task')


const app = express()
const port = process.env.port || 3000

app.use(express.json())




app.post('/users', async (req, res) => {
    // console.log(req.body)
    // res.send('testing')

    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }

})

// READ
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send
    }

})

// READ -user by id w/ route params
app.get('/users/:id', async (req, res) => {
    // console.log(req.params)
    const _id = req.params.id

    try {
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }

})

//UPDATE -user by id w/ route params
app.patch('/users/:id', async (req, res) => {


    //additional error handling for user
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({ error : 'invalid updates'})
    }
    // ^*

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if (!user) {
            return res.status(404).send()
        }
        res.send(user)

    } catch (e) {
        res.status(400).send(e)
    }
})





app.post('/tasks', async (req, res) => {
    // console.log(req.body)
    // res.send('testing')

    const task = new Tasks(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send
    }

})

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Tasks.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }

})

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Tasks.findById(_id)
        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }

})


// UPDATE - tasks by id w/ route params
app.patch('/tasks/:id', async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if(!isValidOperation) {
        return res.status(400).send('invalid updates')
    }

    try {
        const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})




app.listen(port, () => {
    console.log('server is up on port ' + port)
})































































































