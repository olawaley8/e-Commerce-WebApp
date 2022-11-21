const cart = require('../model/cart')
const {verifyToken, adminVerification, authVerification} = require('../middleware/verification')
const cartController = require('../controller/cartController')
const express = require('express')
const router = express.Router()

router.post('/create/:userId', verifyToken, cartController.addToCart)
router.get('/findCart/:userId', authVerification, cartController.getCart)
router.get('/getAllCarts', adminVerification, cartController.getCarts)
router.delete('/deleteCart/:userId/:id', verifyToken, cartController.deleteCart)


module.exports = router