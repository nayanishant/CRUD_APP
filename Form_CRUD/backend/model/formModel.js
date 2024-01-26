const mongoose = require("mongoose")

const formSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Form", formSchema)