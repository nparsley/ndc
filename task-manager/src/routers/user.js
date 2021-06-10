const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')


/* //testing setup
router.get('/test', (req, res) => {
    res.send('from a new file')
})
 */

router.post('/users', async (req, res) => {
    // console.log(req.body)
    // res.send('testing')

    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }

})


// endpoint for logging in users
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        // res.send({ user: user.getPublicProfile(), token })
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})


// logging out user
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send(200)
    } catch (e) {
        res.status(500).send()
    }
})


// logging out all
router.post('/users/logoutALL', auth, async (req, res) => {
    //alternate option
    try {
        req.user.tokens = []
    // try {
    //     req.user.tokens = req.user.tokens.filter((token) => {
    //         return token !== token
    //     })
        await req.user.save()

        res.send(200)
    } catch (e) {
        res.status(500).send()
    }
})

// READ
router.get('/users/me', auth, async (req, res) => {
    // try {
    //     const users = await User.find({})
    //     res.send(users)
    // } catch (e) {
    //     res.status(500).send
    // }
    res.send(req.user)
})


//UPDATE -user by id w/ route params
router.patch('/users/me', auth, async (req, res) => {


    //additional error handling for user
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error : 'invalid updates'})
    }
    // ^*

    try {

        //restructuring to not get bypassed middleware
        // const user = await User.findById(req.params.id)

        updates.forEach((update) => req.user[update] = req.body[update])

        await req.user.save()

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        //     new: true,
        //     runValidators: true
        // })

        res.send(req.user)

    } catch (e) {
        res.status(400).send(e)
    }
})

//DELETE - user by id
router.delete('/users/me', auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id)

        // if (!user) {
        //     return res.status(404).send()
        // }

        await req.user.remove()

        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router





// seperate routes for user/task
/* const router = new express.Router()
router.get('/test', (req, res) => {
    res.send('this is from my other router')
})
app.use(router) */















