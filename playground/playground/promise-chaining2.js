require('../../task-manager/src/db/mongoose')

const Task = require('../../task-manager/src/models/task')


// Task.findByIdAndDelete('60b566a556e74445e0faf49a').then(() => {
//     return Task.countDocuments({
//         completed: false
//     })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })



const deleteTaskAndCount = async (id) => {
    const deleteTask = await Task.findByIdAndDelete(id)
    const countTask = await Task.countDocuments({completed: false})

    return countTask
}

deleteTaskAndCount('60b598dd57ed7e4060c731cd').then((countTask) => {
    console.log(countTask)
}).catch((e) => {
    console.log(e)
})

















