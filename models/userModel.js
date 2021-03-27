const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');
const scheme = Schema(
    {
        name: { type: String, require: true, trim: true },
        email: { type: String, require: true, trim: true, unique: true, index: true },
        password: { type: String, require: true, trim: true, minLength: 3 },
        role: { type: String, default: 'member' },
    },
    { collection: 'users', timestamps: true }
)

scheme.methods.encryptPassword = async function(password){
    const salt = await bcrypt.genSalt(10)  //สุ่มอักขระ ไว้ผสมกับรหัส
    const hahPassword = bcrypt.hash(password , salt)
    return hahPassword
}

const user = mongoose.model('User', scheme)
module.exports = user

