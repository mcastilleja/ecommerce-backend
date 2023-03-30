const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email : {
        type : String,
        required : [true, 'Email is required']
    },
    password : {
        type : String,
        required : [true, 'Password is required']
    },
    first_name : {
        type : String,
        required : [true, 'First name is required']
    },
    last_name : {
        type : String,
        required : [true, 'Last name is required']
    },
    is_admin : {
        type : Boolean,
        default : false,
        required : true
    },
    is_verified : {
        type : Boolean,
        default : false,
        required : true
    }
},{
    timestamps : true
})

module.exports = mongoose.model('User', userSchema)
