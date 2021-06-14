const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.port || 3000


// add file upload to express
const multer = require('multer')
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        // if (!file.originalname.endsWith('.pdf')) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('please upload a word document'))
        }
        cb(undefined, true)


        // cb(new Error('file must be a pdf'))
        // cb(undefined, true)
        // cb(undefined, false) //silently reject upload

    }
})

// app.post('/upload', upload.single('upload'), (req, res) => {
// HANDLING EXPRESS ERRORS
/* const errorMiddleware = (req, res, next) => {
    throw new Error('from middleware ')
} */

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})




app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('server is up on port ' + port)
})



































































