const express = require('express');
const router = express.Router();
const {
    createOrder,
    getUserOrders,
    getOrder,
    updateOrderStatus,
    getAllOrders
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
    .get(protect, getUserOrders)
    .post(protect, createOrder);

router.route('/admin')
    .get(protect, authorize('admin'), getAllOrders);

router.route('/:id')
    .get(protect, getOrder);

router.route('/:id/status')
    .put(protect, authorize('admin'), updateOrderStatus);

module.exports = router; 