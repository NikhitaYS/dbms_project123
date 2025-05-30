const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
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
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update total amount before saving
cartSchema.pre('save', function(next) {
    this.totalAmount = this.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
    this.updatedAt = Date.now();
    next();
});

// Add item to cart
cartSchema.methods.addItem = async function(menuItem, quantity = 1) {
    const existingItem = this.items.find(item => 
        item.menuItem.toString() === menuItem._id.toString()
    );

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        this.items.push({
            menuItem: menuItem._id,
            quantity,
            price: menuItem.price
        });
    }

    return this.save();
};

// Remove item from cart
cartSchema.methods.removeItem = async function(menuItemId) {
    this.items = this.items.filter(item => 
        item.menuItem.toString() !== menuItemId.toString()
    );
    return this.save();
};

// Update item quantity
cartSchema.methods.updateQuantity = async function(menuItemId, quantity) {
    const item = this.items.find(item => 
        item.menuItem.toString() === menuItemId.toString()
    );

    if (item) {
        if (quantity <= 0) {
            return this.removeItem(menuItemId);
        }
        item.quantity = quantity;
        return this.save();
    }
    return this;
};

// Clear cart
cartSchema.methods.clearCart = async function() {
    this.items = [];
    this.totalAmount = 0;
    return this.save();
};

module.exports = mongoose.model('Cart', cartSchema); 