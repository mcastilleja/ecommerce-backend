const mongoose = require('mongoose')

const addressSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    address_alias : {
        type : String,
        required : [true, 'Address alias is required']
    },
    address : {
        type : String,
        required : [true, 'Address is required']
    }
},{
    timestamps : true
})

module.exports = mongoose.model('Address', addressSchema)