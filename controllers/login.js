const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/user_schema')


loginRouter.post('/api/login', async (request, response) => {
    const {username, password} = request.body
    
    const user = await User.findOne({username})
    const correctPassword = user === null ? false : await bcrypt.compare(password, user.password)

    if(!(user && correctPassword)) {
        return response.status(401).json({error: 'invalid username or password'})
    }

    const tokenCreds = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(tokenCreds, process.env.SECRET)

    response.status(200).send({token, username: user.username, name: user.name})
    console.log(`${user.username} logged in`)

})

module.exports = loginRouter
