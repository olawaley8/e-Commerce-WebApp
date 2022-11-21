const mongoose = require('mongoose')


const connectDB = async ()=>{
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('Database connected successfully')
    })
    .catch((err)=>{
        console.log('error connecting to the db')
    })
}

module.exports = connectDB