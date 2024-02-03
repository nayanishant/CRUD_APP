const express = require("express")
const User = require('../Model/userModel')
const { registerHandler } = require("../Controllers/userController")
const router = express.Router()

// Route to post email, username and password
router.post('/register', registerHandler)

// Route to get email, username and password
router.get('/', async (req, res) => {
    try {
        const user = await User.find({})
        return res.status(200).json({
            count: user.length,
            data: user
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).send({
            message: error.message
        })
    }
})

module.exports = router