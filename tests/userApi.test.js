const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

//initial data is in correct format, to setup state of the db before each test.
const initialData = require('./testData').usersMultiple
const User = require('../models/user_schema')

beforeEach(async () => {
    //Clear db
    await User.deleteMany({})

    //Create user objects from initial data
    const userObjects = initialData.map(user => new User(user))

    //"Promise array" for user objects, allows us to wait for every object
    //to be saved before starting test.
    const arr = userObjects.map((user) => user.save())

    //Function end only when all promises are fullfilled.
    await Promise.all(arr)
})

describe('Adding new users', ()  => {
    test('correctly formatted request gets added to the database', async () => {
        const newUserCorrect = {
            username: "ThisShouldBeAdded",
            name: "Noname",
            password: "abc123"
        }
        await api.post('/api/users')
        .send(newUserCorrect)
        .expect(201)

        const response = await api.get('/api/users').expect(200)
        expect(response.body).toHaveLength(initialData.length + 1)


    })

    test('invalid request to not add user and respond with status 400', async () => {

        //Invalid password user, password too short
        const newUserInvalidPass = {
            username: "ThisShouldNotBeAdded",
            name: "Noname",
            password: "ab"
        }

        //Invalid username, username too short
        const newUserInvalidUsrname = {
            username: "Th",
            name: "Noname",
            password: "abc123"
        }

        //Username already in use
        const newUserDuplicateUsrName = {
            username: "Th",
            name: "whatever",
            password: "aaa111"
        }

        await api.post('/api/users')
        .send(newUserInvalidPass)
        .expect(400)

        await api.post('/api/users')
        .send(newUserInvalidUsrname)
        .expect(400)
        
        await api.post('/api/users')
        .send(newUserDuplicateUsrName)
        .expect(400)

        const response = await api.get('/api/users').expect(200)

        expect(response.body).toHaveLength(initialData.length)
    })


})

