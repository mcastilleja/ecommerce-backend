const router = express.Router()
const express = require('express')
const { createOrder, showOrder } = require('../controllers/orderController')
const { protect } =  require('../middleware/authMiddleware')

router.post('/buy', protect, createOrder)
router.get('/myorders', protect, showOrder)

module.exports = router