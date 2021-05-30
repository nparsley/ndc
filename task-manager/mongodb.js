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

/*     const updatePromise = db.collection('users').updateOne({
        _id: new ObjectID("60b1bba7e590f14080f87a92")
    }, {
        $set: {
            name: 'Taylor'
        }
    })

    updatePromise.then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    }) */

/*     updatePromise = db.collection('users').updateOne({
        _id: new ObjectID("60b1bba7e590f14080f87a92")
    }, {
        $inc: {
            age: 4
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    }) */


    db.collection('tasks').updateMany({
        completed: false
    }, {
        $set: {
            completed: true
        }
    }).then((result) => {
        console.log(result.modifiedCount)
    }).catch((error) => {
        console.log(error)
    })


})