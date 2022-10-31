const blogRouter = require('express').Router()
const Blog = require('../models/blog_schema')

blogRouter.get('/api/blogs', async (request, response) => {
  const blogEntries = await Blog.find({})
  response.json(blogEntries)
})

blogRouter.get('/api/blogs/:id', async (request, response) => {
  const blogEntry = await Blog.findById({_id: request.params.id})
  response.json(blogEntry)
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

blogRouter.delete('/api/blogs/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/api/blogs/:id', async (request, response) => {
  const update = request.body.likes
  
  if(update === 1 || update === -1) {
    const previous = await Blog.findById(request.params.id)
    const result = await Blog.findByIdAndUpdate(request.params.id, {likes:previous.likes + update}, {new: true, runValidators: true})
    response.status(200).json(result)
  }
  else {
    response.status(400).end()
  }
})

module.exports = blogRouter