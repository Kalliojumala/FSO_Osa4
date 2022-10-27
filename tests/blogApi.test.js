const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const initialData = require('./testData').blogsMultiple
const Blog = require('../models/blog_schema')

//Clear test db before tests to maintain same database state
beforeEach(async () => {
    await Blog.deleteMany({})

    //Create Blog-objects from initial data
    const blogObjects = initialData.map((blog) => new Blog(blog))

    //Blog.save() returns a promise
    const arr = blogObjects.map((blog) => blog.save())

    //Promise.all(array) waits for all blogObjects to be saved to mongo
    await Promise.all(arr)
})
describe('HTTP GET', () => {

    test('http get returns correct amount of JSON-formatted blog entries',
        async () => {
            const response = await api.get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/)

            expect(response.body).toHaveLength(initialData.length)
        }
    )

    test('response objects have correct field values',
        async () => {
            const response = await api.get('/api/blogs')
                .expect(200)
            
            response.body.map((blog) => {
                expect(blog.id).toBeDefined()
            
            })
            
        }
    )
})


afterAll(() => {
    mongoose.connection.close()
})