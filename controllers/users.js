const userRouter = require('express').Router()
const User = require('../models/user_schema')
const bcrypt = require('bcryptjs')

const createUser = async ({ name, username, password }) => {
    if (password === undefined || username === undefined) {
        return false
    }
    var salt = await bcrypt.genSalt(10)
    var hash = await bcrypt.hash(password, salt)

    const newUser = {
        name: name || username,  //Name is optional, use username in both fields if not specified.
        username: username,
        password: hash
    }

    return newUser

}

userRouter.get('/api/users', async (request, response) => {
    const users = await User.find({})
    response.status(200).json(users)
})

userRouter.post('/api/users', async (request, response) => {
    newUser = await createUser(request.body)
    if (newUser) {
        const user = new User(newUser)
        await user.save()
        response.status(201).end()
    }
    else {
        response.status(400).end()
    }
})



module.exports = userRouter