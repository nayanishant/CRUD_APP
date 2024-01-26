const mongoose = require("mongoose")

const trialSchema = mongoose.Schema(
    {
        text: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Trial", trialSchema)