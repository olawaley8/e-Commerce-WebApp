const {Cart} = require('../model/cart')
const {User} = require('../model/userModel')


const addToCart = async(req, res)=>{
    const {productId, quantity} = req.body.products
    const {userId} = req.params
    try{
        let currentCart = await Cart.findOne({userId})
        if (currentCart) {
    
            let itemIndex = currentCart.products.findIndex(p => p.productId == productId);
            if (itemIndex > -1) {
                let productItem = currentCart.products[itemIndex];
                 productItem.quantity = quantity;
                 currentCart.products[itemIndex] = productItem;
            }
            else{
                currentCart.products.push({productId, quantity });
            }
            currentCart = await currentCart.save();
            return res.status(201).send(currentCart)
                
            }
            else{
                
                const newCart = await Cart.create({
                    userId: req.params.userId,
                    products: [{ productId, quantity}]
                  });
            
                  return res.status(201).send(newCart);
            }
        }

    catch(err){
        return res.status(500).send(err)
    }
}


const getCart = async(req, res)=>{
    try{
        const currentCart = await Cart.findOne({userId: req.params.userId})
        if(!currentCart) return res.status(400).send('Cart not found')
          return res.status(200).json({data: currentCart})
    }
    catch(err){
        return res.status(500).json(err)
    }
}

const deleteCart = async(req, res)=>{
    try{
        if(req.user._id == req.params.userId){

            const deleteCart = await Cart.findByIdAndDelete(req.params.id)
            return res.status(200).send('Cart deleted')
        }
        else{
            return res.status(403).send('forbidden')
        }
    }
    catch(err){
        res.status(500).send(err)
    }
}

const getCarts = async(req, res)=>{
  try{
      const getAllCarts = await Cart.find()
      return res.status(200).json({data: getAllCarts })
     }
  catch(err){
    return res.status(500).json(err)
  }   
}

module.exports = {addToCart, getCart, getCarts, deleteCart }