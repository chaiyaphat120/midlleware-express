const { body } = require('express-validator') //ข้อดีของการใช้ body คือ . filed ได้ด้วย
const validator = [
    body('name').notEmpty().withMessage('กรุณากรอกชื่อและนามสกุลด้วย'), //body ที่field name ห้ามว่าง
    body('email').not().isEmpty().withMessage('กรุณากรอก email ด้วยนะจะ').isEmail().withMessage('รูปแบบ email บ้ถูกต้อง'), //มันจะ chain ได้
    body('password').notEmpty().withMessage('กรุณากรอกรหัสผ่าน').isLength({ min: 3 }).withMessage('รหัสผ่านต้อง 3 ตัวขึ้นไป'),
]
//ส่ง error เป็น array เพราะมี หลายตัว
module.exports = { validator }
