const blogRouter = require('express').Router()
const Blog = require('../models/blog_schema')

blogRouter.get('/api/blogs', async (request, response) => {
  const blogEntries = await Blog.find({})
  response.json(blogEntries)
})


blogRouter.post('/api/blogs', async (request, response, next) => {
  if (!request.body.title || !request.body.url) {
    response.status(400).json("Title and url are required")
  }
  else {
    const blog = new Blog(request.body)
    const result = await blog.save()
    response.status(201).json(result)
  }
})

module.exports = blogRouter