const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
require('dotenv').config()
const {User} = require('../model/userModel')


module.exports = {
    sendVerificationLink: async(email)=>{
        const token = jwt.sign({email}, process.env.JWT_PRIVATE_KEY,
            {
                expiresIn: '600s'
            })

        const url = `http://localhost/${process.env.PORT}/email-verification/${token}`;
        const text = `Welcome to moe's_collection, kindly confirm your email by clicking this link: ${url}`;
        await sendEmail(email, text)
    },
    
    markEmailAsverified: async(email)=>{
        const user = await User.findOne({email})
        user.isVerified = true
        user.save(user)
    },
    decodeEmailToken: async(token)=>{
        const payload = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
        if(payload) return await this.markEmailAsverified(payload.email)
    },

    forgotPassword: async(email)=>{
        const user = await User.findOne({email})
        if(!user) return res.status(400).send('Email does not exist')
        const url = `http://localhost/${process.env.PORT}/reset-password/${user._id}`;
        const text = `Welcome to moe's_collection, kindly reset your password by clicking this link: ${url}`;
        await sendEmail(email, text)
    },
    resetPassword: async(id, body, res)=>{
        const user = await User.findById({_id: id})
        if(!user) return res.status(400).send('user not found')

        if(body.password == body.confirmPassword) {
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(body.password, salt)
            await user.save()
        }
        
    }
    
}

let sendEmail = async (email, text, res)=>{
    try{
        const transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 587,
            secure: false, // upgrade later with STARTTLS
            auth: {
              user: process.env.USER,
              pass: process.env.PASS
            },
          });
            await transport.sendMail({
                from: process.env.FROM_MAIL,
                to: email,
                text: text

            })
    }
    catch(err){
        res.send(err)
    }
}

