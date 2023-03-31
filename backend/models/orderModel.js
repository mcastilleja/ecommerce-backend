const mongoose = require('mongoose')

var n = Math.floor(Math.random()*1000000000);

const orderSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    date : {
        type : Date,
        default : Date.now,
        required : true
    },
    is_paid : {
        type : Boolean,
        default : false,
        required : true
    },
    guide : {
        type : String,
        required : false
    },
    delivered : {
        type : Boolean,
        default : false,
        required : true
    }
})

module.exports = mongoose.model('Order', orderSchema)
