require('dotenv').config()
module.exports = {
    PORT: process.env.PORT,
    MONGODB_URL: process.env.MONGODB_URL,
    JWT_SECRETE:process.env.JWT_SECRETE
}
