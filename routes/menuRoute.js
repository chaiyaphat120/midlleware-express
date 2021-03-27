const express = require('express')
const router = express.Router()
const userController = require("../controllers/menuController")

router.post('/', userController.insert)
router.get('/', userController.find)
module.exports = router
