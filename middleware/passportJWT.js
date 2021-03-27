const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/userModel')
const passport = require('passport')
const { JWT_SECRETE } = require('../configs/index')
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken() //jwtFromRequest คือ token
opts.secretOrKey = JWT_SECRETE
// opts.issuer = 'accounts.examplesoft.com'
// opts.audience = 'yoursite.net'
passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
        //done แทน next()
        //jwt_payload คือ payload
        try {
            const user = await User.findById(jwt_payload.id)
            if (!user) {
                return done(new Error('ไม่พบผู้ใช้ในระบบ', null)) // parmsmeter ตัวแรก คือ error ตัวที่สองคือ ข้อมูล user ที่แนบกับ req
            }
            return done(null, user) //null คือ error  params ตัวที่สอง , req.user = user
        } catch (error) {
            done(error)
        }
    })
)

//เวลาเอาไปใช้
module.exports.isLogin = passport.authenticate('jwt', { session: false })
