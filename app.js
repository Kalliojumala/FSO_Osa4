const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./utils/config')
const mongoUrl = config.mongoUrl || "localhost:3001/"

const logger = require('./utils/logger')

mongoose.connect(mongoUrl).then(() => {
    logger.info("Database connection succesfull.")
}).catch(e => {
    logger.error(e.message)
})

app.use(cors())
app.use(express.json())

const blogRouter = require('./controllers/blogs')
app.use(blogRouter)

module.exports = app
