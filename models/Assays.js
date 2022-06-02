const mongoose = require('mongoose')

const assaySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    sampType: {
        type: String,
        enum: ['Serum', 'Li-Hep Plasma', 'EDTA', 'Whole blood', 'Blood spot'],
        required: true,
    },
})

const Assays = mongoose.model('Assays', assaySchema)
module.exports = Assays
