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

describe('HTTP POST', () => {

    test('http post adds blog entry to database',
        async () => {
            const newBlog = {
                title: "Test POST req",
                author: "None",
                url: "None",
                likes: 0
            }

            await api.post('/api/blogs')
                .send(newBlog)
                .expect(201)

            const getResponse = await api.get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/)

            expect(getResponse.body).toHaveLength(initialData.length + 1)
            
        }
    )

    test('adding blogObject without "likes" field creates field with value 0',
        async () => {
            const newBlog = {
                title: "Test POST req",
                author: "None",
                url: "None",
            }

            const response = await api.post('/api/blogs')
                .send(newBlog)
                .expect(201)

            expect(response.body.likes).toBeDefined()
            expect(response.body.likes).toBe(0)
            

        }

    )

    test('adding blogObject without title or url results in 400',
        async () => {
            const blogNoUrl = {
                title: "Test POST req",
                author: "None",
            }

            const blogNoTitle = {
                author: 'xd',
                url: 'www.testing.abc'
            }
            
            await api.post('/api/blogs')
                .send(blogNoUrl)
                .expect(400)

            await api.post('/api/blogs')
                .send(blogNoTitle)
                .expect(400)

            //Check items were not added to database.
            const result = await api.get('/api/blogs')
            expect(result.body).toHaveLength(initialData.length)

        }
    
    )

})

afterAll(() => {
    mongoose.connection.close()
})