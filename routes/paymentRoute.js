
const {initialize} =  require('../controller/paymentController')
const express = require('express')

const router = express.Router()
const {authVerification} = require('../middleware/verification')


router.post('/payment',  authVerification, initialize)
router.post('/mywebhook',(req, res)=>{
    console.log(req.body)
    return res.status(200).json({});
})
module.exports = router