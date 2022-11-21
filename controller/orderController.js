const {Order} = require('../model/order')
const {Product} = require('../model/product')

const createOrder = async(req, res)=>{

    const {products} = req.body

    let price = 0;
    for (let i = 0; i < products.length; i++) {
     let product = products[i];
     
     let myProduct = await Product.findById(product.productId)

    if (!myProduct) {
         res.status(404).send("Product Id does not exist");
  } else {

      price += (myProduct.price * product.quantity) 
    }
}
    


    try{
        const order = await Order.create({
            userId: req.user._id,
            ...req.body})
            order.total_amount = price

            await order.save()
            return res.status(200).json({order})
    }
    catch(err){
        res.status(500).send(err)
    }
}

const updateOrder = async(req, res)=>{
    try{
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
        {new: true}
        )
        return res.status(200).send('Order has been updated successfully')
    }
    catch(err){
        res.status(500).json(err)
    }
}

const getOrder = async(req, res)=>{
    try{
        const order = await Order.find({userId: req.params.id})
        if(!order) return res.status(400).send('Order not found')
        return res.status(200).json({data: order})
    }
    catch(err){
        return res.status(500).json(err)
    }
}

const deleteOrder = async(req, res)=>{
    try{
        const deleteOrder = await Order.findByIdAndDelete(req.params.id)
        res.status(200).send('Order deleted')
    }
    catch(err){
        res.status(500).send(err)
    }
}

const getOrders = async(req, res)=>{
  try{
      const getAllOrders = await Order.find()
      return res.status(200).json({data: getAllOrders })
     }
  catch(err){
    return res.status(500).json(err)
  }   
}

const income = async(req, res)=>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1))
    const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1))

    try{
        const income = await Order.aggregate([
            {$match: {$createdAt:{$gte: previousMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt"},
                    sales: "$amount",
                },
            },    
            {
                    $group: {
                        _id: "$month",
                        total: {$sum: "$sales"}
                    },
            },

        ]);
        res.status.send(income)
    }
    catch(err){
        res.status(400).json(err)
    }
}


module.exports = {createOrder, updateOrder, getOrder, getOrders, deleteOrder, income }