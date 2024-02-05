const express = require("express")
const User = require('../Model/userModel')
const { registerHandler, loginHandler } = require("../Controllers/userController")
const userVerification = require("../middleware/userMiddleware")
const router = express.Router()

// Route to register
router.post('/register', registerHandler)

// Route to login
router.post('/login', loginHandler)

// Route to get email, username and password
router.get('/showallusers', userVerification, async (req, res) => {
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