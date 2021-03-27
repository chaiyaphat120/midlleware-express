const mongoose = require('mongoose')
const Schema = mongoose.Schema
const scheme = Schema(
    {
        name: { type: String, require: true, trim: true },
        email: { type: String, require: true, trim: true, unique: true, index: true },
        password: { type: String, require: true, trim: true, minLength: 3 },
        role: { type: String, default: 'member' },
    },
    { collection: 'users', timestamps: true }
)

const user = mongoose.model('User', scheme)
module.exports = user

