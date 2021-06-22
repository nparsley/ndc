const request = require('supertest')
const app = require('../src/app')

test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'rick',
        email: 'nick@ex.com',
        password: 'mypass777!'
    }).expect(201)
})









  



















