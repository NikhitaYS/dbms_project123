// DOM Elements
const deliveryForm = document.getElementById('delivery-form');
const orderItems = document.querySelector('.order-items');
const subtotalElement = document.querySelector('.subtotal');
const finalTotalElement = document.querySelector('.final-total');
const placeOrderBtn = document.getElementById('place-order-btn');
const cardDetails = document.getElementById('card-details');
const upiDetails = document.getElementById('upi-details');

// Payment method radio buttons
const paymentMethods = document.querySelectorAll('input[name="payment"]');

// Cart items from localStorage
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Initialize checkout page
function initializeCheckout() {
    console.log('Initializing checkout...');
    console.log('Cart items:', cartItems);

    if (cartItems.length === 0) {
        console.log('Cart is empty, redirecting to cart page');
        window.location.href = 'cart.html';
        return;
    }

    try {
        displayOrderItems();
        updateOrderSummary();
        setupPaymentMethodListeners();
        console.log('Checkout initialized successfully');
    } catch (error) {
        console.error('Error initializing checkout:', error);
        showNotification('Error loading checkout page', 'error');
    }
}

// Display order items
function displayOrderItems() {
    console.log('Displaying order items...');
    orderItems.innerHTML = '';
    
    cartItems.forEach(item => {
        console.log('Processing item:', item);
        const itemElement = document.createElement('div');
        itemElement.className = 'order-item';
        itemElement.innerHTML = `
            <div class="item-details">
                <span class="item-name">${item.name}</span>
                <span class="item-quantity">x${item.quantity}</span>
            </div>
            <span class="item-price">₹${(item.price * item.quantity).toFixed(0)}</span>
        `;
        orderItems.appendChild(itemElement);
    });
}

// Update order summary
function updateOrderSummary() {
    console.log('Updating order summary...');
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 49;
    const total = subtotal + deliveryFee;

    console.log('Subtotal:', subtotal);
    console.log('Total:', total);

    subtotalElement.textContent = `₹${subtotal.toFixed(0)}`;
    finalTotalElement.textContent = `₹${total.toFixed(0)}`;
}

// Setup payment method listeners
function setupPaymentMethodListeners() {
    console.log('Setting up payment method listeners...');
    paymentMethods.forEach(method => {
        method.addEventListener('change', (e) => {
            const selectedMethod = e.target.value;
            console.log('Selected payment method:', selectedMethod);
            
            // Hide all payment details
            cardDetails.style.display = 'none';
            upiDetails.style.display = 'none';
            
            // Show selected payment details
            if (selectedMethod === 'card') {
                cardDetails.style.display = 'block';
            } else if (selectedMethod === 'upi') {
                upiDetails.style.display = 'block';
            }
        });
    });
}

// Handle form submission
function handleSubmit(event) {
    console.log('Form submitted...');
    event.preventDefault();
    
    try {
        const formData = new FormData(deliveryForm);
        const deliveryDetails = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            address: formData.get('address'),
            city: formData.get('city'),
            pincode: formData.get('pincode'),
            instructions: formData.get('instructions')
        };

        // Validate form
        if (!deliveryDetails.name || !deliveryDetails.phone || !deliveryDetails.address || 
            !deliveryDetails.city || !deliveryDetails.pincode) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Store delivery details in localStorage
        localStorage.setItem('deliveryDetails', JSON.stringify(deliveryDetails));

        // Redirect to payment page
        window.location.href = 'payment.html';
    } catch (error) {
        console.error('Error processing order:', error);
        showNotification('Error processing order', 'error');
    }
}

// Show notification
function showNotification(message, type = 'success') {
    console.log('Showing notification:', message, type);
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Event Listeners
console.log('Setting up event listeners...');
if (deliveryForm) {
    deliveryForm.addEventListener('submit', handleSubmit);
    console.log('Form submit listener added');
} else {
    console.error('Delivery form not found!');
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing checkout...');
    initializeCheckout();
}); 