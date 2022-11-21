const mongoose = require('mongoose')
const { User } = require('./userModel')
const { Product } = require('./product')

const cartSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId,
        ref: "User"},
    products:[
        { 
            productId: {type: mongoose.Schema.Types.ObjectId,
                ref: "Product"},
            quantity: Number
        }
    ]
    },
    {timestamps: true}
)

const Cart = mongoose.model('Cart', cartSchema)

module.exports = {Cart}