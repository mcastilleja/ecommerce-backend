const express = require('express')
const router = express.Router()
const { loginUser, registerUser, getMyData, verifyUser, getMyProducts, getMyAddress, setAddress, updateAddress, deleteAddress } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.put('/:id', verifyUser)
router.post('/login', loginUser)
router.post('/account', protect, getMyData)
router.post('/products', protect, getMyProducts)
router.post('/newaddress', protect, setAddress)
router.route('/myaddresses').get(protect, getMyAddress)
router.route('/address/:id').put(protect, updateAddress).delete(protect, deleteAddress)

module.exports = router