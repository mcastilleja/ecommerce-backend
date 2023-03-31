const asyncHandler = require('express-async-handler')
const Order = require('../models/orderModel')
const PackageOrder = require('../models/packageOrderModel')
const Product = require('../models/productModel')

const createOrder = asyncHandler(async(req, res) => {
   
    const { product, amount} = req.body

    const idProduct = await Product.findById(product)

    if(!idProduct){
        res.status(400)
        throw new Error('Selected product is not found in the DB')
    }

    const package = await PackageOrder.create({
        product_name : idProduct.name,
        amount,
        price : idProduct.price
    })

    res.status(200).json(package)
})

const showOrder = asyncHandler( async(req, res) => {

})

module.exports = {
    createOrder,
    showOrder
}