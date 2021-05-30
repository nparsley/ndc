// crud ops

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')


const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()
console.log(id.id.length)
console.log(id.toHexString().length)


MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('unable to connect to database')
    }
    
    const db = client.db(databaseName)


/*     db.collection('users').insertOne({
        
        name: 'nicholas',
        age: 32
    }, (error, result) => {
        if (error) {
            return console.log('unable to inhsert user')
        }

        console.log(result.ops)
    }) */

/*     db.collection('users').insertMany([
        {
            name: 'Jen',
            age: 28
        },
        {
            name: 'ted',
            age: 27
        }
    ], (error, result) => {
        if (error) {
            return console.log('unable to insert documents')
        }

        console.log(result.ops)

    }) */

/*     db.collection('tasks').insertMany([
        {
            description: 'create database',
            completed: true
        },
        {
            description: 'edit data',
            completed: true
        },
        {
            description: 'finish app',
            completed: false
        }
    ], (error, result) => {
        if (error) {
            return console.log('error creating tasks')
        }

        console.log(result.ops)
    }) */




})