const request = require('supertest')
const Tasks = require('../src/models/task')
const { userOne, userOneId, setupDatabase } = require('./fixtures/db')
const app = require('../src/app')



//make sure users are deleted before test runs
beforeEach(setupDatabase)

test('Should create task for user', async () => {
    const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        description: 'task test'
    })
    .expect(201)
    
    const task = await Tasks.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})

























