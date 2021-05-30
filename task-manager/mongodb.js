// crud ops

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')


const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'




MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('unable to connect to database')
    }
    
    const db = client.db(databaseName)

    // db.collection('users').findOne({ _id: new ObjectID("60b2e6417c1cb50cac518288") }, (error, user) => {
    //     if (error) {
    //         return console.log('unable to fetch')
    //     }

    //     console.log(user)
    // })


    // db.collection('users').find({ age: 27 }).toArray((error, users) => {
    //     console.log(users)
    // })
    // db.collection('users').find({ age: 27 }).count((error, count) => {
    //     console.log(count)
    // })

    db.collection('tasks').findOne({ _id: new ObjectID("60b2e936824aa42a3024bf91") }, (error, task) => {
        console.log(task)
    })

    db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
        console.log(tasks)
    })

})