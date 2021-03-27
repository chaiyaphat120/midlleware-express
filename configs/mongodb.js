require('dotenv').config()
const mongoose = require('mongoose')
const { MONGODB_URL } = require('./index')
mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
console.log("moongDb is connected ")
module.exports = { mongoose }
