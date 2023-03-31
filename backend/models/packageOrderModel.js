const mongoose = require('mongoose')

const packageOrderSchema = mongoose.Schema({
    order : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Order',
        required : true
    },
    product : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product',
        required : true
    },
    product_name : {
        type: String,
        required : [true, 'Product name is required']
    },
    amount : {
        type : Number,
        default : 1,
        required : [true, 'Order quantity is required']
    },
    price : {
        type : Number,
        required : [true, 'Current price is required']
    }
})

module.exports = mongoose.model('PackageOrder', packageOrderSchema)