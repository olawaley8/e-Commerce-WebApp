const express = require('express');
const app = express();
const cors = require('cors')
const connectDB = require('./db');
const authRoutes = require('./routes/authRoute');
const userRoutes = require('./routes/userRoute');
const productRoutes = require('./routes/productRoute');
const cartRoutes = require('./routes/cartRoute');
const orderRoutes = require('./routes/orderRoute');
const paymentRoute = require('./routes/paymentRoute');

require('dotenv').config()

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/checkout", paymentRoute)

const port = process.env.PORT || 3000

connectDB()
.then(()=>{
    app.listen(port, ()=>{
        console.log(`server listening on port ${port}`)
    })
})

