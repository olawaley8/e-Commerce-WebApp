const mongoose = require('mongoose')
const Joi = require('@hapi/joi')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
},
{timestamps: true}
)

const User = mongoose.model('User', userSchema)

function regValidation(user){
    const schema = Joi.object({
        username: Joi.string().min(5).required(),
        fullname: Joi.string().required(),
        password: Joi.string().min(5).max(15).required(),
        email: Joi.string().required().email(),
        isVerified: Joi.boolean(),
    })

    return schema.validate(user)
}

function loginValidation(req) {
    const schema = Joi.object({
        username: Joi.string().min(5).required(),
        password: Joi.string().min(5).max(15).required()
    })
    return schema.validate(req)
}

exports.User = User
exports.regValidation = regValidation
exports.loginValidation = loginValidation