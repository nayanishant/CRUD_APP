const bcrypt = require("bcrypt")
const User = require('../Model/userModel')

const registerHandler = async (req, res) => {

    const {username, email, password} = req.body

    try {
        const isUser = await User.findOne({email})
        if (isUser) {
            res.send("User already exists.")
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({username, email, password: hashedPassword})

        return res.status(200).send({
            message: "User created successfully."
        })
    } catch (error) {
        console.log(`Error creating user: ${error}`)
        res.status(400).send({
            message: error.message
        })
    }
}

module.exports = {
    registerHandler,
}