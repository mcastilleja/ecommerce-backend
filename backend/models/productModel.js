const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        require : true
    },
    name : {
        type : String,
        required : [ true, 'Product name is required']
    },
    category : {
        type : String,
        required : [ true, 'Category is required']
    },
    brand : {
        type : String,
        required : [ true, 'Product brand is required']
    },
    sku : {
        type : String,
        required : [ true, 'Product SKU is required']
    },
    price : {
        type : Number,
        required : [ true, 'The product needs a price']
    },
    amount : {
        type : Number,
        required : [ true, 'Quantity of products is required']
    },
    description : {
        type : String,
        required : [true, 'A product description is required']
    }
},{
    timestamps : true
})

module.exports = mongoose.model('Product', productSchema)
