require('dotenv').config()

const PORT = process.env.PORT

const mongoUrl = process.env.NODE_ENV ==='test' ? process.env.TEST_DB_URL :  process.env.DB_URL

module.exports = {
    PORT, mongoUrl
}