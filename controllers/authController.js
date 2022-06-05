const User = require('../models/User')
const jwt = require('jsonwebtoken')

// Handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code)
  let errors = {email: '', password: ''}

  // Login - incorrect email
  if (err.message === 'Incorrect email') {
    errors.email = 'Email is not registered'
  }
  // Login - incorrect password
  if (err.message === 'Incorrect password') {
    errors.password = 'Incorrect password'
  }
  // Handle unique email validation
  if (err.code === 11000) {
    errors.email = 'That email already exists.'
    return errors
  }
  // validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({properties}) => {
      errors[properties.path] = properties.message
    })
  }
  return errors
}

// Create JWT token
const MaxAge = 3 * 24 * 60 * 60 // 1 days in seconds (uses seconds)
const createToken = (id) => {
  const secret = process.env.JWT
  // ********* This should be in .env for production *********
  return jwt.sign({id}, secret, {
    expiresIn: MaxAge,
  })
}

const signup_get = (req, res) => {
  res.render('signup')
}

const login_get = (req, res) => {
  res.render('login')
}
// User signup and generate JWT token for user
const signup_post = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.create({email, password})
    const token = createToken(user._id)
    res.cookie('jwt', token, {httpOnly: true, MaxAge: MaxAge * 1000}) // exp: 3 days, cookies in ms
    res.status(201).json({user: user._id})
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}

const login_post = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)
    const token = createToken(user._id)
    res.cookie('jwt', token, {httpOnly: true, MaxAge: MaxAge * 1000}) // exp: 3 days, cookies in ms
    res.status(200).json({user: user._id})
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors })
  }
}

const logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 })
  res.redirect('/')
}

module.exports = {
  signup_get,
  signup_post,
  login_get,
  login_post,
  logout_get
}
