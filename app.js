const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./utils/config')
const mongoUrl = config.mongoUrl || "localhost:3001/"

const errorHandler = require('./utils/middleware')
const logger = require('./utils/logger')

mongoose.connect(mongoUrl).then(() => {
    logger.info("Database connection succesfull.")
}).catch(e => {
    logger.error(e.message)
})

app.use(cors())
app.use(express.json())
app.use(errorHandler)

const userRouter = require('./controllers/users')
const blogRouter = require('./controllers/blogs')
app.use(userRouter)
app.use(blogRouter)

module.exports = app
