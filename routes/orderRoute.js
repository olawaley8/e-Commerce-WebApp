const order = require('../model/order')
const {adminVerification, authVerification, verifyToken} = require('../middleware/verification')
const orderController = require('../controller/orderController')
const express = require('express')
const router = express.Router()


router.post('/create', verifyToken, orderController.createOrder)
router.get('/findOrder/:userId', authVerification, orderController.getOrder)
router.get('/getAllOrders', adminVerification, orderController.getOrders)
router.get('/income', adminVerification, orderController.income)
router.put('/updateOrder/:id', authVerification, orderController.updateOrder)
router.delete('/deleteOrder/:id', authVerification, orderController.deleteOrder)


module.exports = router