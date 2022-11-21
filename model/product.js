const mongoose = require('mongoose')
const Joi = require('@hapi/joi')

const productSchema = new mongoose.Schema(
    {
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {type: String, required: true},
    image:{type: String, required: true},
    categories: { type: Array},

    size:{type: String},
    color:{type: String},
    price:{type: Number, required: true},
    },
    {timestamps: true}
)

// function prodValidation(){
//     const schema = Joi.object({
//        Title: Joi.string().required(),
//        Desc: Joi.string().required(),
//        color: Joi.string(),
//        price: Joi.number()
//     })
//     return schema.validate()
// }

const Product = mongoose.model('Product', productSchema)

module.exports = {Product}

