const express = require('express')
const router = express.Router()
const { loginUser, registerUser, getMyData } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.post('/myaccount', protect, getMyData)

module.exports = router