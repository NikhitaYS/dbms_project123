document.addEventListener('DOMContentLoaded', () => {
    const deliveryForm = document.getElementById('delivery-form');
    const orderItemsContainer = document.querySelector('.order-items');
    const subtotalElement = document.querySelector('.subtotal');
    const totalElement = document.querySelector('.final-total');
    const cartCount = document.querySelector('.cart-count');
    const deliveryFee = 49;

    // Initialize delivery page
    function initializeDelivery() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        if (cartItems.length === 0) {
            window.location.href = 'cart.html';
            return;
        }

        displayOrderItems(cartItems);
        updateOrderSummary(cartItems);
        updateCartCount(cartItems);
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

    // Handle form submission
    function handleSubmit(event) {
        event.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            address: document.getElementById('address').value,
            instructions: document.getElementById('instructions').value
        };

        // Validate form data
        if (!formData.name || !formData.phone || !formData.email || !formData.address) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Save delivery details to localStorage
        localStorage.setItem('deliveryDetails', JSON.stringify(formData));

        // Redirect to payment page
        window.location.href = 'payment.html';
    }

    // Initialize page
    initializeDelivery();

    // Add form submit event listener
    deliveryForm.addEventListener('submit', handleSubmit);
}); 