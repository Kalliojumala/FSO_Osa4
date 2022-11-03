const userRouter = require('express').Router()
const User = require('../models/user_schema')
const bcrypt = require('bcryptjs')

const createUser = async ({ name, username, password, message }) => {
    
    //Validations
    if (password === undefined || username === undefined) {
        return [false, "Username and password are required"]
    }

    if(username.length < 3 || password.length < 3) {
        return [false, "Field minlength is 3"]
    }

    var userNameInUse = await User.findOne({'username': username})

    if(userNameInUse) {
        
        return [false, "Username already in use!"]
    }


    //Password encryption
    var salt = await bcrypt.genSalt(10)
    var hash = await bcrypt.hash(password, salt)

    const newUser = {
        name: name || username,  //Name is optional, use username in both fields if not specified.
        username: username,
        password: hash
    }

    //Not a good practice but i felt lazy and it works...
    return [newUser, `User created: ${username}`]

}

userRouter.get('/api/users', async (request, response) => {
    const users = await User.find({}).populate('blogs', {title: 1, url: 1, likes: 1})
    response.status(200).json(users)
})

userRouter.post('/api/users', async (request, response) => {
    
    newUser = await createUser(request.body)
    if (newUser[0]) {
        const user = new User(newUser[0])
        await user.save()
        response.status(201).json(newUser[1]).end()
    }
    else {
        response.status(400).json(newUser[1]).end()
    }
})



module.exports = userRouter