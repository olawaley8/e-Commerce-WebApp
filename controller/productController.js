const {Product} = require('../model/product')

const createProduct = async(req, res)=>{
    try{
        const product = await Product.create(req.body)
            await product.save()
            return res.status(200).json(product)
    }
    catch(err){
        res.status(500).send(err)
    }
}

const updateProduct = async(req, res)=>{
    try{
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
        {new: true}
        )
        return res.status(200).send('Product has been updated successfully')
    }
    catch(err){
        res.status(500).json(err)
    }
}

const getProduct = async(req, res)=>{
    try{
        const findProduct = await Product.findById(req.params.id)
        if(!findProduct) return res.status(400).send('Product not found')
        return res.status(200).json({data: findProduct})
    }
    catch(err){
        return res.status(500).json(err)
    }
}

const deleteProduct = async(req, res)=>{
    try{
        const deleteProduct = await Product.findByIdAndDelete(req.params.id)
        res.status(200).send('Product deleted')
    }
    catch(err){
        res.status(500).send(err)
    }
}

const getProducts = async(req, res)=>{
  try{
      const getAllProducts = await Product.find()
      return res.status(200).json({data: getAllProducts })
     }
  catch(err){
    return res.status(500).json(err)
  }   
}

module.exports = {createProduct, updateProduct, getProduct, getProducts, deleteProduct }