const express = require('express')
const router = express.Router()
const { loginUser, registerUser, getMyData, setAddress, updateAddress, deleteAddress } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.post('/myaccount', protect, getMyData)
router.post('/addaddress', protect, setAddress)
router.route('/address/:id').put(protect, updateAddress).delete(protect, deleteAddress)

module.exports = router