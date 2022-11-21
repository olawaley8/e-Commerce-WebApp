const mongoose = require('mongoose')
const { User } = require('./userModel')
const { Product } = require('./product')

const orderSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    products:[
        {
            productId: {type: mongoose.Schema.Types.ObjectId, ref: "Product"},
            quantity: {type: Number, default: 1}
        }
    ],
    total_amount: {type: Number},
    address:{type: Object, required: true},
    status:{ type: String, default: 'pending'}
    },
    {timestamps: true}
)

const Order = mongoose.model('Order', orderSchema)

module.exports = {Order}