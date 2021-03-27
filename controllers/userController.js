const User = require('../models/userModel')
const { encryptPasswordByBcrypt, encryptPasswordByArgon2 } = require('../helpers/hahPassword.js')
const { validationResult } = require('express-validator') //ไว้รับ error
exports.register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body
        const user = new User()
        //validation
        const errorsFormLib = validationResult(req) //error แนบ มากับ req
        if (!errorsFormLib.isEmpty()) {
            // return res.status(422).json({ error: errors.array() })  //แบบเก่า
            const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง')
            error.statusCode = 422
            error.validation = errorsFormLib.array() //ส่ง error ที่ทำมาจาก express-validator'
            throw error
        }

        //check email ซ้ำ
        const existEmail = await User.find({ email })
        if (existEmail) {
            const error = new Error('email ซ้ำ มีคนใช้แล้ว ลองใหม่อีกครั้ง') //.message จะได่ error คำนี้ email ซ้ำ มีคนใช้แล้ว ลองใหม่อีกครั้ง"  //error.message
            error.statusCode = 400
            throw error //โยนค่า errorไป catch เพื่อ next ต่อ
        }

        user.name = name
        // user.password = await user.encryptPassword(password)  //const user = new User()
        // user.password = await encryptPasswordByBcrypt(password)  //const user = new User()
        user.password = await encryptPasswordByArgon2(password) //const user = new User()
        user.email = email
        user.role = role

        await user.save()
        res.status(200).json({
            message: 'ลงทะเบียนเรียบร้อยแล้ว!',
        })
    } catch (error) {
        next(error) //จะให้ next ไป error  เพราะ config ไว้หน้า server.js แล้ว
    }
}

exports.login = async (req, res, next) => {
    // try {
    //     const { email, password } = req.body
    //     //check ว่า มี email นี้หรือไม่
    //     const user = await User.findOne({ email })
    //     if (!user) {
    //         const error = new Error('ไม่พบผู้ใช้งานในระบบ') //err.message
    //         error.statusCode = 400
    //         throw error
    //     }
    //     //ตรวจสอบรหัสผ่านว่าตรงหรือบ้  ไม่ตรง(false) ให้ยืนค่า error ออกไป
    //     const isValid = await user.checkPassword(password)
    //     if (!isValid) {
    //         const error = new Error('รหัสผ่านไม่ถูกต้อง') //err.message
    //         error.statusCode = 401
    //         throw error
    //     }
    //     //สร้าง token //check แค่ verify ผ่าน
    //     console.log({ id: user._id, role: user.role })
    //     const payload = { id: user._id, role: user.role }
    //     //https://www.grc.com/passwords.htm  ไว้ gen secrete
    //     const token = await jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '50 min' })
    //     console.log('2')
    //     //decode วันหมดอายุ
    //     const expires_in = jwt.decode(token)
    //     res.status(200).json({
    //         access_token: token,
    //         expires_in: expires_in.exp,
    //         token_type: 'Bearer',
    //     })
    // } catch (error) {
    //     console.log(error)
    //     next(error)
    // }
}

exports.me = async (req, res, next) => {
    // try {
    //     const { _id, name, email, role } = req.user
    //     res.status(200).json({
    //         user: {
    //             _id,
    //             name,
    //             email,
    //             role,
    //         },
    //     })
    // } catch (error) {}
}
