const express = require('express')
const Tasks = require('../models/task')
const router = new express.Router()



router.post('/tasks', async (req, res) => {
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

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Tasks.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }

})

router.get('/tasks/:id', async (req, res) => {
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
router.patch('/tasks/:id', async (req, res) => {

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

//DELETE - task by id
router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Tasks.findByIdAndDelete(req.params.id)

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router