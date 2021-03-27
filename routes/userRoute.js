const express = require('express')
const router = express.Router()
const passportJWT = require('../middleware/passportJWT') //passby jwt
const { isAdmin } = require('../middleware/chackAdmin')

const userController = require('../controllers/userController')
const { validator } = require('../helpers/user/registerValidator.js')

router.get('/', [passportJWT.isLogin], isAdmin, userController.findAll)  //เฉพาะ Admin เท่านั้นที่เข้าได้
router.get('/me', [passportJWT.isLogin], userController.me)
router.post('/register', validator, userController.register)
router.post('/login', userController.login)
module.exports = router
