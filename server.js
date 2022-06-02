const express = require('express')
const app = express()
app.use(express.static('public'))

const mongoose = require('mongoose')

app.set('view engine', 'ejs')
require('dotenv').config()

const assayRoutes = require('./routes/assayFinderRoutes')
app.use('/assays', assayRoutes)
const PORT = process.env.PORT || 3000

// Connect to mongoDB and start server if successful
mongoose
    .connect(process.env.MONGODB_URI)
    .then((result) => app.listen(PORT))
    .catch((err) => console.log(err))

app.get('/', (req, res) => {
    res.render('index')
})