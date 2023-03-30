const express = require('express')
const router = express.Router()
const { getProducts, setProducts, updateProducts, deleteProducts } = require('../controllers/productController')
const { protect } =  require('../middleware/authMiddleware')

router.route('/').get(getProducts).post(protect, setProducts)
router.route('/:id').put(protect, updateProducts).delete(protect, deleteProducts)

module.exports = router
