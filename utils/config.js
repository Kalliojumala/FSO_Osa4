require('dotenv').config()

let PORT = process.env.PORT
let mongoUrl = process.env.DB_URL

module.exports = {
    PORT, mongoUrl
}