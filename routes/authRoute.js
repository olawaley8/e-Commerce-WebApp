const express = require('express')
const router = express.Router()
const user = require('../model/userModel')
const authController = require('../controller/authController')

router.post("/register", authController.register )
router.post("/login",authController.login)
router.get("/email-verification/:token", authController.verify)
router.post("/forgotPassword", authController.forgotPassword)
router.post("/resetPassword/:id", authController.resetPassword)


module.exports = router
