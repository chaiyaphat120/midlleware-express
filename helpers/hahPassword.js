const bcrypt = require('bcrypt')
const argon2 = require('argon2');

const encryptPasswordByBcrypt = async function (password) {
    const salt = await bcrypt.genSalt(10) //สุ่มอักขระ ไว้ผสมกับรหัส
    const hahPassword = bcrypt.hash(password, salt)
    return hahPassword
}

const encryptPasswordByArgon2= async function (password) {
    const hahPassword = await argon2.hash(password);
    return hahPassword
}


module.exports = { encryptPasswordByBcrypt  ,encryptPasswordByArgon2 }
