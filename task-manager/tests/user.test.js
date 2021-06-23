const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')


const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'mike',
    email: 'mike@ex.com',
    password: '56what?',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}


//make sure users are deleted before test runs
beforeEach( async () => {
    // console.log('before each')
    await User.deleteMany()
    await new User(userOne).save()
})


/* afterEach(() => {
    console.log('after each')  
}) */

test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'rick',
        email: 'nick@ex.com',
        password: 'mypass777!'
    }).expect(201)
})
 

test('Should login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: 'steve@ex.com',
        password: 'helloworld22'
    }).expect(400)
})
  
test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})


test('Should not get profile for unauthenticated user', async () => {
    await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})



test('Should delete account for user', async () => {
    await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})


test('Should not delete account for user', async () => {
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})
 




