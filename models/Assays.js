const mongoose = require('mongoose')

const assaySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    sampType: {
        type: String,
        required: true,
    },
})

const Assays = mongoose.model('Assays', assaySchema)
module.exports = Assays
