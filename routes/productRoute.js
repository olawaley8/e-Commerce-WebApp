const product = require('../model/product')
const {adminVerification, authVerification, verifyToken} = require('../middleware/verification')
const productController = require('../controller/productController')
const express = require('express')
const router = express.Router()

router.post('/create', adminVerification, productController.createProduct)
router.get('/findProduct/:id', productController.getProduct)
router.get('/getAllProducts', productController.getProducts)
router.put('/updateProduct/:id', adminVerification, productController.updateProduct)
router.delete('/deleteProduct/:id', adminVerification, productController.deleteProduct)


module.exports = router