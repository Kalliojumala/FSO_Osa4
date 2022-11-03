const blogRouter = require('express').Router()
const Blog = require('../models/blog_schema')
const User = require('../models/user_schema')

blogRouter.get('/api/blogs', async (request, response) => {
  
  const blogEntries = await Blog.find({}).populate('user', {username : 1, name: 1})
  response.json(blogEntries)
})

blogRouter.get('/api/blogs/:id', async (request, response) => {
  const blogEntry = await Blog.findById({_id: request.params.id}).populate('user', {username : 1, name: 1})
  response.json(blogEntry)
})

blogRouter.post('/api/blogs', async (request, response) => {

  const body = request.body
  
  if(!body.userId) {
    var firstUser = await User.findOne({})
    var userId = firstUser.id
  }
  else {
    var userId = body.userId
  }

  if (!body.title || !body.url) {
    response.status(400).json("Title and url are required")
  }
  else {
    const user = await User.findById(userId)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes ? body.likes : 0,
      user: user._id
    })

    //Save new blog
    const result = await blog.save()

    //Save new blog id to its user/creator
    user.blogs = user.blogs.concat(result._id)
    await user.save()

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