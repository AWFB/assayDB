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

assaySchema.index({ name: 'text' })

const Assays = mongoose.model('Assays', assaySchema)
module.exports = Assays
