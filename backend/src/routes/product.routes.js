const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { authenticate, authorize } = require('../middlewares/auth.middeware');

// Public routes (no login needed)
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Protected routes (login + role required)
router.post('/', authenticate, authorize('seller', 'admin'), productController.createProduct);
router.put('/:id', authenticate, authorize('seller', 'admin'), productController.updateProduct);
router.delete('/:id', authenticate, authorize('seller', 'admin'), productController.deleteProduct);

module.exports = router;