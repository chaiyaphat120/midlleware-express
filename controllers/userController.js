const User = require('../models/userModel')
const { encryptPasswordByBcrypt, encryptPasswordByArgon2 } = require('../helpers/hahPassword.js')
const { comparePasswordArgon2 } = require('../helpers/comparePassword.js')
const { validationResult } = require('express-validator') //ไว้รับ error
const { JWT_SECRETE } = require('../configs/index.js')

const jwt = require('jsonwebtoken')

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
        const existEmail = await User.findOne({ email })
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
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        const { _id, role } = user

        //check ว่า มี emailใน ระบบ นี้หรือไม่
        if (!user) {
            const error = new Error('ไม่พบผู้ใช้งานในระบบ') //err.message
            error.statusCode = 400
            throw error
        }

        // ตรวจสอบ password ว่าตรงกันหรือไม่
        //argon ต้องส่งอันแรกเป็น hah pawword จาก store
        const isValid = await comparePasswordArgon2(user.password, password)
        if (!isValid) {
            const error = new Error('รหัสของคุณไม่ถูกต้อง') //err.message
            error.statusCode = 404
            throw error
        }

        //genarate jwt to response json
        const prepareData = {
            id: _id,
            role,
        }
        const acess_token = jwt.sign(prepareData, JWT_SECRETE, { expiresIn: '5 days' })
        const expires_in = jwt.decode(acess_token)
        res.status(200).json({
            acess_token,
            expires_in: expires_in.exp, //วันหมดอายุ
            message: 'ล็อกอินสำเร็จ',
            token_type: 'Bearer',
        })
    } catch (error) {
        next(error)
    }
}

exports.me = async (req, res, next) => {
    try {
        const { _id, name, email, role } = req.user
        res.status(200).json({
            user: {
                _id,
                name,
                email,
                role,
            },
        })
    } catch (error) {}
}

exports.findAll = async (req, res, next) => {
    try {
        const user = await User.find()
        res.status(200).json({
            data: user,
        })
    } catch (error) {
        res.status(400).json({
            error,
        })
    }
}
