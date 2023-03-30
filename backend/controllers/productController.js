const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')

const getProducts = asyncHandler( async(req, res) => {

    const products = await Product.find().select('-user')
    res.status(200).json(products)

})

const setProducts = asyncHandler( async(req, res) => {

    const { name, category, brand, sku, price, amount, description } = req.body

    if(req.user.is_admin === false ){
        res.status(401)
        throw new Error('UNAUTHORIZED ACCESS, you do not have permissions for this action')
    }

    if(!name || !category || !brand || !sku || !price || !amount || !description){
        res.status(400)
        throw new Error('All fields are required')
    }

    const product = await Product.create({
        user : req.user.id,
        name, 
        category, 
        brand, 
        sku, 
        price, 
        amount, 
        description
    })

    res.status(201).json(product)

})

const updateProducts = asyncHandler( async(req, res) => {

    if(req.user.is_admin === false ){
        res.status(401)
        throw new Error('UNAUTHORIZED ACCESS, you do not have permissions for this action')
    }

    const product = await Product.findById(req.params.id)

    if(!product){
        res.status(400)
        throw new Error('Product not found')
    }

    if(product.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('UNAUTHORIZED ACCESS, Product does not belong to the logged user')
    }

    const modProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true})

    res.status(200).json(modProduct)
    
})

const deleteProducts = asyncHandler( async(req, res) => {

    if(req.user.is_admin === false ){
        res.status(401)
        throw new Error('UNAUTHORIZED ACCESS, you do not have permissions for this action')
    }

    const product = await Product.findById(req.params.id)

    if(!product){
        res.status(400)
        throw new Error('Product not found')
    }

    if(product.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('UNAUTHORIZED ACCESS, Product does not belong to the logged user')
    }

    const delProduct = await Product.findByIdAndDelete(req.params.id)

    res.status(200).json(delProduct)
    
})

module.exports = {
    getProducts,
    setProducts,
    updateProducts,
    deleteProducts
}