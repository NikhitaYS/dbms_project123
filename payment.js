document.addEventListener('DOMContentLoaded', () => {
    const paymentMethods = document.querySelectorAll('input[name="payment"]');
    const paymentDetailSections = document.querySelectorAll('.payment-detail-section');
    const placeOrderBtn = document.querySelector('.place-order-btn');
    const orderItemsContainer = document.querySelector('.order-items');
    const deliveryDetailsContainer = document.getElementById('delivery-details');
    const subtotalElement = document.querySelector('.subtotal');
    const totalElement = document.querySelector('.final-total');
    const cartCount = document.querySelector('.cart-count');
    const deliveryFee = 49;

    // Initialize payment page
    function initializePayment() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const deliveryDetails = JSON.parse(localStorage.getItem('deliveryDetails')) || {};

        if (cartItems.length === 0) {
            window.location.href = 'cart.html';
            return;
        }

        if (!deliveryDetails.name) {
            window.location.href = 'delivery.html';
            return;
        }

        displayOrderItems(cartItems);
        displayDeliveryDetails(deliveryDetails);
        updateOrderSummary(cartItems);
        updateCartCount(cartItems);
        setupPaymentMethodListeners();
    }

    // Display order items
    function displayOrderItems(cartItems) {
        orderItemsContainer.innerHTML = cartItems.map(item => `
            <div class="order-item">
                <div class="order-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="order-item-details">
                    <h3>${item.name}</h3>
                    <div class="order-item-price">₹${item.price}</div>
                    <div class="order-item-quantity">Quantity: ${item.quantity}</div>
                </div>
            </div>
        `).join('');
    }

    // Display delivery details
    function displayDeliveryDetails(details) {
        deliveryDetailsContainer.innerHTML = `
            <p><strong>Name:</strong> ${details.name}</p>
            <p><strong>Phone:</strong> ${details.phone}</p>
            <p><strong>Email:</strong> ${details.email}</p>
            <p><strong>Address:</strong> ${details.address}</p>
            ${details.instructions ? `<p><strong>Instructions:</strong> ${details.instructions}</p>` : ''}
        `;
    }

    // Update order summary
    function updateOrderSummary(cartItems) {
        const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        const total = subtotal + deliveryFee;

        subtotalElement.textContent = `₹${subtotal}`;
        totalElement.textContent = `₹${total}`;
    }

    // Update cart count
    function updateCartCount(items) {
        const totalItems = items.reduce((total, item) => total + item.quantity, 0);
        if (cartCount) {
            cartCount.textContent = totalItems;
        }
    }

    // Setup payment method listeners
    function setupPaymentMethodListeners() {
        paymentMethods.forEach(method => {
            method.addEventListener('change', () => {
                const selectedMethod = method.value;
                paymentDetailSections.forEach(section => {
                    section.style.display = 'none';
                });
                document.getElementById(`${selectedMethod}-details`).style.display = 'block';
            });
        });
    }

    // Show notification
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Validate payment details
    function validatePaymentDetails() {
        const selectedMethod = document.querySelector('input[name="payment"]:checked').value;
        
        switch (selectedMethod) {
            case 'upi':
                const upiId = document.getElementById('upi-id').value;
                if (!upiId) {
                    showNotification('Please enter your UPI ID', 'error');
                    return false;
                }
                break;
            case 'card':
                const cardNumber = document.getElementById('card-number').value;
                const expiry = document.getElementById('expiry').value;
                const cvv = document.getElementById('cvv').value;
                if (!cardNumber || !expiry || !cvv) {
                    showNotification('Please fill in all card details', 'error');
                    return false;
                }
                break;
            case 'netbanking':
                const bank = document.getElementById('bank').value;
                if (!bank) {
                    showNotification('Please select your bank', 'error');
                    return false;
                }
                break;
        }
        return true;
    }

    // Handle place order
    function handlePlaceOrder() {
        if (!validatePaymentDetails()) {
            return;
        }

        // Get order details
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const deliveryDetails = JSON.parse(localStorage.getItem('deliveryDetails')) || {};
        const selectedPaymentMethod = document.querySelector('input[name="payment"]:checked').value;

        // Create order object
        const order = {
            items: cartItems,
            delivery: deliveryDetails,
            payment: selectedPaymentMethod,
            total: cartItems.reduce((total, item) => total + (item.price * item.quantity), 0) + deliveryFee,
            orderDate: new Date().toISOString(),
            orderId: generateOrderId()
        };

        // Save order to localStorage
        localStorage.setItem('currentOrder', JSON.stringify(order));

        // Clear cart
        localStorage.removeItem('cartItems');
        localStorage.removeItem('deliveryDetails');

        // Redirect to order confirmation
        window.location.href = 'order-confirmation.html';
    }

    // Generate order ID
    function generateOrderId() {
        return 'ORD' + Date.now().toString().slice(-6) + Math.random().toString(36).substr(2, 3).toUpperCase();
    }

    // Initialize page
    initializePayment();

    // Add event listener for place order button
    placeOrderBtn.addEventListener('click', handlePlaceOrder);
}); 