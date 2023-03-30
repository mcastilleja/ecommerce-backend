const express = require('express')
const router = express.Router()
const { loginUser, registerUser, getMyData, getMyProducts, setAddress, updateAddress, deleteAddress } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.post('/account', protect, getMyData)
router.post('/products', protect, getMyProducts)
router.post('/addaddress', protect, setAddress)
router.route('/address/:id').put(protect, updateAddress).delete(protect, deleteAddress)

module.exports = router