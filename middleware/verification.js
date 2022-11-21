const jwt = require('jsonwebtoken')
require ('dotenv').config()

const verifyToken = (req, res, next)=>{
   const authBearer = req.headers.token
   if(authBearer) {
      const token = authBearer.split(" ")[1];
      jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, user)=>{
         if(err) return res.status(403).send('Invalid token')
         req.user = user;
         next()
      })
   } 
   else {
      return res.status(401).send('You are not authenticated')
   }
}


const adminVerification = (req, res, next)=>{
   verifyToken(req, res, ()=>{
      if(req.user.isAdmin){
         next()
      } else {
         res.status(403).send("Get permission from the Admin")
      }
   })

}

const authVerification = (req, res, next)=>{
   verifyToken(req, res, ()=>{
      if(req.user.id === req.params.id || req.user.isAdmin){
         next()
      } else {
         res.status(403).send('Highly Forbidden')
      }
   })
}

module.exports = {verifyToken, adminVerification, authVerification };