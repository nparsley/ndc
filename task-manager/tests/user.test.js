const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
// const jwt = require('jsonwebtoken')
// const mongoose = require('mongoose')

const { userOne, userOneId, setupDatabase } = require('./fixtures/db')


//make sure users are deleted before test runs
beforeEach(setupDatabase)


test('Should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'rick',
        email: 'nick@ex.com',
        password: 'mypass777!'
    }).expect(201)

    // assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // assertions about the response
    // expect(response.body.user.name).toBe('rick')
    expect(response.body).toMatchObject({
        user: {
            name: 'rick',
            email: 'nick@ex.com',
        },
        token: user.tokens[0].token
    }) 
    expect(user.password).not.toBe('mypass777!')
})
 

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
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

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})


test('Should not delete account for user', async () => {
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})
 


test('Should upload avatar image', async () => {
    await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/profile-pic.jpg')
    .expect(200)

    const user = await User.findById(userOneId)
    // expect({}).toBe({})
    expect(user.avatar).toEqual(expect.any(Buffer))

})


test('Should update valid user fields', async () => {
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        name: 'rickrick'
    })
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toEqual('rickrick')
})


test('Should not update invalid user fields', async () => {
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        location: 'arizona'
    })
    .expect(400)


})













