const blogRouter = require('express').Router()
const Blog = require('../models/blog_schema')

blogRouter.get('/api/blogs', async (request, response) => {
    const blogEntries = await Blog.find({})
    response.json(blogEntries)
  })
  

blogRouter.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })

module.exports = blogRouter