const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv").config()
const connectDB = require('./Config/db')
const userRoutes = require('./Routes/userRoutes')
const cookieParser = require("cookie-parser")

const port = process.env.PORT || 5000

const app = express()

connectDB()

app.use(cors({
    origin: "http://localhost:4000",
    methods: ["GET", "POST"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use('/', userRoutes)


app.listen(port, () => {
    try {
        console.log(`Server connected at port ${port}.`)
    } catch (error) {
        console.log(`Error connecting server: ${error}`)
    }
})