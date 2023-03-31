const asyncHandler = require('express-async-handler')
const Order = require('../models/orderModel')
const PackageOrder = require('../models/packageOrderModel')

const createOrder = asyncHandler(async (req, res) => {
})

const showOrder = asyncHandler( async(req, res) => {

})

module.exports = {
    createOrder,
    showOrder
}