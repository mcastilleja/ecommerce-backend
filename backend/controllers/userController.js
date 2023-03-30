const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Address = require('../models/addressModel')
const Product = require('../models/productModel')

const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body

    if(!email || !password){
        res.status(400)
        throw new Error('All data is required')
    }

    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id : user.id,
            first_name : user.first_name,
            last_name : user.last_name,
            email : user.email,
            is_admin : user.is_admin,
            is_verified : user.is_verified,
            token : genToken(user.id)

        })
    } else {
        res.status(400)
        throw new Error('Credentials are wrong')
    }
})

const registerUser = asyncHandler(async(req, res) => {
    const { email, password, first_name, last_name, is_admin, is_verified } = req.body

    if(!email || !password || !first_name || !last_name ) {
        res.status(400)
        throw new Error('All data is required')
    }

    const userExist = await User.findOne({email})

    if(userExist) {
        res.status(400)
        throw new Error('Sorry the email already exists')
    } 

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        first_name,
        last_name,
        email,
        password : hashPassword,
        is_admin,
        is_verified
    })

    if(user) {
        res.status(201).json({
            _id : user.id,
            first_name : user.first_name,
            last_name : user.last_name,
            email : user.email
        })
    } else {
        res.status(400)
        throw new Error('Data is incorrect, the user cannot be created')
    }

})

const getMyData = asyncHandler( async(req, res) => {
    res.json(req.user)
})

const genToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn : '30d'
    })
}



const getMyProducts = asyncHandler( async(req, res) => {

    if(req.user.is_admin === false ){
        res.status(401)
        throw new Error('UNAUTHORIZED ACCESS, you do not have permissions for this action')
    }

    const productList = await Product.find({user: req.user.id})

    res.status(200).json(productList)

})

const setAddress = asyncHandler( async(req, res) => {

    const {name, address} = req.body

    if( !name || !address ){
        res.status(400)
        throw new Error('All data is required')
    }

    const newAddress = await Address.create({
        user : req.user.id,
        address_alias : name,
        address
    })

    res.status(201).json(newAddress)
    
})

const updateAddress = asyncHandler( async(req,res) => {

    const address = Address.findById(req.params.id)

    if(!address){
        res.status(400)
        throw new Error('Address not found')
    }

    if(address.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Unauthorized access, address does not belong to user')
    }

    const addressMod = await Address.findByIdAndUpdate(req.params.id, req.body, {new:true})

    res.status(200).json(addressMod)

})

const deleteAddress = asyncHandler( async(req,res) => {

    const address = Address.findById(req.params.id)

    if(!address){
        res.status(400)
        throw new Error('Address not found')
    }

    if(address.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Unauthorized access, address does not belong to user')
    }

    const addressDel = await Address.findByIdAndDelete(req.params.id)

    res.status(200).json(addressDel)

})

module.exports = {
    loginUser,
    registerUser,
    getMyData,
    getMyProducts,
    setAddress,
    updateAddress,
    deleteAddress
}

