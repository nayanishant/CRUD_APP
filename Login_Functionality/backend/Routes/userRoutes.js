const express = require("express")
const User = require('../Model/userModel')
const router = express.Router()

// Route to post email, username and password
router.post('/', async (req, res) => {
    try {
        
        if (!req.body.email || !req.body.username || !req.body.password) {
            res.status(400).send({
                message: "Fill all fields."
            })
        }
    
        newUser = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }

        const user = await User.create(newUser)

        return res.status(200).send(user)

    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            message: error.message
        })
    }
})

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