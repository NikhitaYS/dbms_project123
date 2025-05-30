const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        menuItem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MenuItem',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity must be at least 1']
        },
        price: {
            type: Number,
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'],
        default: 'pending'
    },
    deliveryAddress: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zipCode: {
            type: String,
            required: true
        }
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'card'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    estimatedDeliveryTime: {
        type: Date
    },
    specialInstructions: {
        type: String,
        maxlength: [500, 'Special instructions cannot be more than 500 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Calculate total amount before saving
orderSchema.pre('save', function(next) {
    this.totalAmount = this.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
    next();
});

// Calculate estimated delivery time
orderSchema.methods.calculateDeliveryTime = function() {
    const now = new Date();
    const preparationTime = this.items.reduce((max, item) => {
        return Math.max(max, item.menuItem.preparationTime);
    }, 0);
    
    // Add 30 minutes for delivery
    this.estimatedDeliveryTime = new Date(now.getTime() + (preparationTime + 30) * 60000);
    return this.save();
};

module.exports = mongoose.model('Order', orderSchema); 