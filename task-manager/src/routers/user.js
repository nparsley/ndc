const express = require('express')
const multer = require('multer')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')
const { request } = require('express')
const sharp = require('sharp')
const { sendWelcomeEmail, sendDeleteEmail } = require('../emails/account')


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
        sendWelcomeEmail(user.email, user.name)
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
        sendDeleteEmail(req.user.email, req.user.name)
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})


// CREATE READ UPDATE + DELETE AVATAR-user
// POST /users/me/avatar

const upload = multer({
    // dest:'avatar',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {

        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('file must be jpg, jpeg, or png'))
        }

        cb(undefined, true)
    }
})
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()

    // req.user.avatar = req.file.buffer
    req.user.avatar = buffer

    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar', auth, async (req, res) => {
        req.user.avatar = undefined
        await req.user.save()
        res.send()
    
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        // res.set('Content-type', 'image/jpg')
        res.set('Content-type', 'image/png')
        res.send(user.avatar)

    } catch (e) {
        res.stats(404).send()
    }
})


module.exports = router


// seperate routes for user/task
/* const router = new express.Router()
router.get('/test', (req, res) => {
    res.send('this is from my other router')
})
app.use(router) */















