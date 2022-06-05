const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters'],
    },
})

// Hash password before saving to database
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// Static method to login user
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email })
    if (user) {
        // bcrypt hashes user inputted password and compares to the hashed password in DB
        const auth = await bcrypt.compare(password, user.password)
        // Fires if passwords match
        if (auth) {
            return user
        }
        throw Error('Incorrect password')
    }
    throw Error('Incorrect email')
}

const User = mongoose.model('user', userSchema)

module.exports = User