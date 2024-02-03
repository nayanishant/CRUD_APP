const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv").config()
const connectDB = require('./Config/db')
const userRoutes = require('./Routes/userRoutes')

const port = process.env.PORT || 5000

const app = express()

connectDB()

app.use(cors())
app.use(express.json())
app.use('/', userRoutes)

app.listen(port, () => {
    try {
        console.log(`Server connected at port ${5000}.`)
    } catch (error) {
        console.log(`Error connecting server: ${error}`)
    }
})