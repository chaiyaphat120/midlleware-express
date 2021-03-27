const User = require('../Models/userModel')
exports.register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body
        const user = new User()
        user.name = name
        user.password = password
        user.email = email
        user.role = role

        await user.save()
        res.status(200).json({
            message: 'ลงทะเบียนเรียบร้อยแล้ว!',
        })
    } catch (error) {
        next(error)
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
