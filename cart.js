const express = require('express');
const router = express.Router();
const {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
} = require('../controllers/cartController');
const { protect } = require('../middleware/auth');

router.route('/')
    .get(protect, getCart)
    .delete(protect, clearCart);

router.route('/items')
    .post(protect, addToCart);

router.route('/items/:menuItemId')
    .put(protect, updateCartItem)
    .delete(protect, removeFromCart);

module.exports = router; 