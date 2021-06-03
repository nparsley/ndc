require('../src/db/mongoose')

const Task = require('../src/models/task')


Task.findByIdAndDelete('60b566a556e74445e0faf49a').then(() => {
    return Task.countDocuments({
        completed: false
    })
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})























