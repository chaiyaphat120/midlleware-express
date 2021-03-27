const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const logger = require('morgan')
const passport = require('passport')

const { mongoose } = require('./configs/mongodb')

const helmet = require('helmet') //จัดการเกี่ยวกับ security ** ลบ power-by ได้ด้วย  จะลบ header express ออกไป
const rateLimit = require('express-rate-limit') //จัดการเกี่ยวกับ request
const  cors = require('cors')  //ให้ domain หรือ ip อื่น สามารถใช้ ip เราได้   *** django มีด้วย

require('dotenv').config() //import .env

const app = express()
const server = require('http').createServer(app)
mongoose //connect mongoDb

//initialize passport
passport.initialize()

//security
app.use(helmet())

//limit การยิง add  **ถ้าใช้ heroku เปิด  app.set('trust proxy', 1); ด้วย
// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', 1)

const limiter = rateLimit({
    windowMs: 10 * 1000, // 10 วินาที
    max: 5, // limit each IP to 100 requests per windowMs
})
//จำกัด 5 req ภายใน 10 วิ
//  apply to all requests
app.use(limiter);


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

const userRouter = require('./routes/userRoute')
app.use('/user', userRouter)

const port = process.env.PORT || 4000
server.listen(port, () => {
    console.log(`server running on ${port}`)
})
//import middleware  **ต้อง use ไว้ล่างสุด ก่อน export
const { errorValidator } = require('./middleware/errorHandler')

app.use(errorValidator)
module.exports = app
