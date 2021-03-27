const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { validator } = require('../helpers/user/registerValidator.js')

router.post('/register', validator, userController.register)
router.post('/login', userController.login)
module.exports = router
