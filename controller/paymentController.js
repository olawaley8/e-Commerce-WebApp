require('dotenv').config()

const {total_amount} = require('../model/order')
const Paystack = require('@paystack/paystack-sdk')
const paystack = new Paystack(process.env.PAYSTACK_TEST_KEY)

const initialize = async(req, res) => {
  const email = req.body.email
  total_amount = req.body.amount
  
  const response = await paystack.transaction.initialize({
    email,total_amount
  })
  res.send(response)
}

module.exports = {initialize}
