const express = require("express")
const dotenv = require("dotenv").config()
const connectDB = require("./config/db")
const Trial = require("./model/model")
const bodyParser = require("body-parser")
const cors = require("cors")

const port = process.env.PORT || 8000

connectDB()

const app = express()

app.use(express.json())
app.use(cors())
app .use(bodyParser.json())

app.get('/', async (req, res) => {
    try {
        const trials = await Trial.find()
        res.json(trials)
    } catch (error) {
        res.status(500).json(
            {
                error: 'Internal Server Error'
            }
        )
    }
})

app.post('/', async (req, res) => {
    try {
        const newTrials = new Trial(req.body)
        await newTrials.save()
        res.status(201).json(newTrials)
    } catch (error) {
        console.error('Error adding trial:', error.message);
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }

})

// app.put('/:id', async (req, res) => {
//     try {
//         const updateTrials = await Trial.findByIdAndUpdate(req.params.id, req.body, { new: true})
//         res.json(updateTrials)
//     } catch (error) {
//         res.status(500).json({
//             error: 'Internal Server Error'
//         })
//     }
// })

app.delete('/:id', async (req, res) => {
    try {
        const deleteTrials = await Trial.findByIdAndDelete(req.params.id)
        res.json(deleteTrials)
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error'
        })
    }
})

app.listen(port, () => {
    console.log(`Server is running at port ${port}.`)
})