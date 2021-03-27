const bcrypt = require('bcrypt')

const encryptPasswordByBcrypt = async function (password) {
    const salt = await bcrypt.genSalt(10) //สุ่มอักขระ ไว้ผสมกับรหัส
    const hahPassword = bcrypt.hash(password, salt)
    return hahPassword
}

const encryptPasswordByBcrypt = async function (password) {
    const salt = await bcrypt.genSalt(10) //สุ่มอักขระ ไว้ผสมกับรหัส
    const hahPassword = bcrypt.hash(password, salt)
    return hahPassword
}

module.exports = { encryptPasswordByBcrypt }
