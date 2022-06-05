// Custom middleware that verifies the JWT is present and correct
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt

  // check jwt exists and is valid
  if (token) {
    // ********* 'secret' should be in .env for production *********
    const secret = process.env.JWT
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        console.log(err.message)
        res.redirect('/login')
      } else {
        console.log(decodedToken)
        next()
      }
    })
  } else {
    res.redirect('/login')
  }
}

// Check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt
  if (token) {
    const secret = process.env.JWT
    jwt.verify(token, secret, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null
        next()
      } else {
        let user = await User.findById(decodedToken.id)
        res.locals.user = user
        next()
      }
    })
  } else {
    res.locals.user = null
    next()
  }
}

module.exports = {requireAuth, checkUser}