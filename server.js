const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const logger = require('morgan')

const { mongoose } = require('./configs/mongodb')

require('dotenv').config() //import .env

const app = express()
const server = require('http').createServer(app)
mongoose //connect mongoDb

app.use(
    cors({
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    })
)
if (process.env.NODE_ENV === 'production') {
    app.use(logger('dev'))
}
app.use(
    express.json({
        limit: '50mb',
    })
)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

const menuRouter = require('./routes/menuRoute')
app.use('/menu', menuRouter)

const port = process.env.PORT || 4000
server.listen(port, () => {
    console.log(`server running on ${port}`)
})

module.exports = app
