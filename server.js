// Import required modules
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()

// middleware
app.use(express.static('public'))
require('dotenv').config()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

// View engine
app.set('view engine', 'ejs')


// Import routes
const assayRoutes = require('./routes/assayFinderRoutes')
const authRoutes = require('./routes/authRoutes')
const { checkUser } = require('./middleware/authMiddleware')


// Connect to mongoDB and start server if successful
const PORT = process.env.PORT || 3000
mongoose
    .connect(process.env.MONGODB_URI)
    .then((result) => app.listen(PORT))
    .catch((err) => console.log(err))

// Homepage route
app.get('*', checkUser) //apply checkUser to all routes
app.get('/', (req, res) => {
    res.render('index')
})
// app.get('/assays/create/assay', requireAuth, (req, res) => {
//     res.render('createAssay')
// }) 
app.use(assayRoutes)
app.use(authRoutes)

// Catch-all route for handing 404 errors
app.use((req, res) => {
    res.status(404).render('404', {title: '404 error'})
})

