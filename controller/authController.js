const {User, regValidation, loginValidation} = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const helper = require('../helper/helperService')
const { body } = require('express-validator')

module.exports = {
    register: async (req, res)=> {
        const {error} = regValidation(req.body)  
        if (error) return res.status(400).send(error.details[0].message)

        let user = await User.findOne({username: req.body.username})
        if (user) return res.status(400).send('User already exists')

        user = await User.create({

            fullname: req.body.fullname,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        await user.save()


        await helper.sendVerificationLink(user.email)
        return res.status(201).send("Kindly check your mail to verify your account")
   
    },

    login : async (req, res)=>{
        // const {error} = loginValidation(req.body)
        // if (error) return res.status(400).send(error.details[0].message)

        const user = await User.findOne({username: req.body.username})

        if (!user) return res.status(404).send('incorrect username ')

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword) return res.status(404).send('incorrect password')

        if(!user.isVerified) {
            await helper.sendVerificationLink(user.email)
            return res.status(200).send('kindly check your mail to verify our account')
        }

        const token = jwt.sign({_id: user._id, isAdmin: user.isAdmin}, process.env.JWT_PRIVATE_KEY,
            {
                expiresIn: '3d',
        })
        

        return res.status(200).json({user,token})
        
    
    },
    verify: async(req, res)=>{
        const token = req.params
        const decoded = await helper.decodeEmailToken(token)
        if (decoded) return res.send('Account verified')
    },
    resetPassword: async(req, res)=>{

        const body = req.body
        const id = req.params

        await helper.resetPassword(id, body)
        return res.status(200).send('Password updated successfully')

    },
    forgotPassword: async(req, res)=>{
       const email = req.body.email
       await helper.forgotPassword(email)
    }
    

}

