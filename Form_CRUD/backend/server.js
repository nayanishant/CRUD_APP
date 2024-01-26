const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const connectDb = require("./config/db")
const Form = require("./model/formModel")

const port = process.env.PORT || 8080

dotenv.config()
connectDb()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/api/data', async (req, res) => {
    try {
        const fetchData = await Form.find()
        res.json(fetchData)
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
})

app.post('/api/data', async (req, res) => {
    try {
        const postData = await Form.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        })
        res.json(postData)
    } catch (error) {
        console.log('Error posting data:', error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
})

app.listen(port, () => {
    try {
        console.log('Server chal gaya.')
    } catch (error) {
        console.log(`Error starting the server: ${error.message}`)
    }
})