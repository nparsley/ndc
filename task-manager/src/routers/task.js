const express = require('express')
const Tasks = require('../models/task')
const router = new express.Router()
const auth = require('../middleware/auth')


router.post('/tasks', auth, async (req, res) => {
    // console.log(req.body)
    // res.send('testing')

    // const task = new Tasks(req.body)
    const task = new Tasks({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send
    }

})

router.get('/tasks', auth, async (req, res) => {
    try {
        // const tasks = await Tasks.find({})

        //auth task endpoints - 2 options
        const tasks = await Tasks.find({ owner: req.user._id})
        await req.user.populate('tasks').execPopulate()
        // res.send(tasks)
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }

})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        // const task = await Tasks.findById(_id)
        const task = await Tasks.findOne({ _id, owner: req.user._id })
        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }

})


// UPDATE - tasks by id w/ route params
router.patch('/tasks/:id', auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if(!isValidOperation) {
        return res.status(400).send('invalid updates')
    }

    try {
        const task = await Tasks.findOne({ _id: req.params.id, owner: req.user._id })
        // const task = await Tasks.findById(req.params.id)


        
        // const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, {
        //     new: true,
        //     runValidators: true
        // })

        if (!task) {
            return res.status(404).send()
        }
        updates.forEach((update) => {
            task[update] = req.body[update]
        })

        await task.save()

        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

//DELETE - task by id
router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        // const task = await Tasks.findByIdAndDelete(req.params.id)

        //removing task by owner value
        const task = await Tasks.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router