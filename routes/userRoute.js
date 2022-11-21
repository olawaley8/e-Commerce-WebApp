const {adminVerification, authVerification, verifyToken} = require('../middleware/verification')
const userController = require('../controller/userController')
const express = require('express')
const router = express.Router()

router.get('/findUser/:id', adminVerification, userController.getUserById)
router.get('/getUsers', adminVerification, userController.getUsers)
router.get('/stats', adminVerification, userController.userStats)
router.put('/updateUser/:id', authVerification, userController.updatedUsers)
router.delete('/deleteUser/:id', authVerification, userController.removeUser)


module.exports = router