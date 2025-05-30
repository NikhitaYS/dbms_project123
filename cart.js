document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.cart-items');
    const subtotalElement = document.querySelector('.subtotal');
    const totalElement = document.querySelector('.final-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const cartCount = document.querySelector('.cart-count');
    const deliveryFee = 49; // ₹49 delivery fee

    // Initialize cart
    function initializeCart() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        if (cartItems.length === 0) {
            displayEmptyCart();
        } else {
            displayCartItems(cartItems);
            updateOrderSummary(cartItems);
        }
        updateCheckoutButton(cartItems);
        updateCartCount(cartItems);
    }

    // Display empty cart message
    function displayEmptyCart() {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <a href="menu.html" class="continue-shopping">Continue Shopping</a>
            </div>
        `;
        subtotalElement.textContent = '₹0';
        totalElement.textContent = '₹0';
    }

    // Display cart items
    function displayCartItems(cartItems) {
        cartItemsContainer.innerHTML = cartItems.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <div class="item-price">₹${item.price}</div>
                    <div class="item-quantity">
                        <button class="quantity-btn decrease">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn increase">+</button>
                    </div>
                </div>
                <button class="remove-btn">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');

        // Add event listeners for quantity buttons and remove buttons
        addCartItemEventListeners();
    }

    // Add event listeners to cart items
    function addCartItemEventListeners() {
        // Quantity buttons
        document.querySelectorAll('.quantity-btn').forEach(button => {
            button.addEventListener('click', handleQuantityChange);
        });

        // Remove buttons
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', handleRemoveItem);
        });
    }

    // Handle quantity changes
    function handleQuantityChange(event) {
        const button = event.target;
        const cartItem = button.closest('.cart-item');
        const itemId = cartItem.dataset.id;
        const quantitySpan = cartItem.querySelector('.item-quantity span');
        let quantity = parseInt(quantitySpan.textContent);

        if (button.classList.contains('increase')) {
            quantity++;
        } else if (button.classList.contains('decrease') && quantity > 1) {
            quantity--;
        }

        // Update the quantity display immediately
        quantitySpan.textContent = quantity;

        // Update the cart
        updateItemQuantity(itemId, quantity);
    }

    // Update item quantity
    function updateItemQuantity(itemId, newQuantity) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const itemIndex = cartItems.findIndex(item => item.id === itemId);

        if (itemIndex !== -1) {
            cartItems[itemIndex].quantity = newQuantity;
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateOrderSummary(cartItems);
            updateCheckoutButton(cartItems);
            updateCartCount(cartItems);
            showNotification('Cart updated successfully', 'success');
        }
    }

    // Handle item removal
    function handleRemoveItem(event) {
        const button = event.target.closest('.remove-btn');
        const cartItem = button.closest('.cart-item');
        const itemId = cartItem.dataset.id;

        removeItemFromCart(itemId);
    }

    // Remove item from cart
    function removeItemFromCart(itemId) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const updatedItems = cartItems.filter(item => item.id !== itemId);
        
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
        
        if (updatedItems.length === 0) {
            displayEmptyCart();
        } else {
            displayCartItems(updatedItems);
            updateOrderSummary(updatedItems);
        }
        
        updateCheckoutButton(updatedItems);
        updateCartCount(updatedItems);
        showNotification('Item removed from cart', 'success');
    }

    // Update order summary
    function updateOrderSummary(cartItems) {
        const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        const total = subtotal + deliveryFee;

        subtotalElement.textContent = `₹${subtotal}`;
        totalElement.textContent = `₹${total}`;
    }

    // Update checkout button state
    function updateCheckoutButton(cartItems) {
        if (cartItems.length === 0) {
            checkoutBtn.disabled = true;
            checkoutBtn.style.cursor = 'not-allowed';
        } else {
            checkoutBtn.disabled = false;
            checkoutBtn.style.cursor = 'pointer';
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

    // Handle checkout
    function handleCheckout() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        if (cartItems.length === 0) {
            showNotification('Your cart is empty', 'error');
            return;
        }
        window.location.href = 'delivery.html';
    }

    // Update cart count
    function updateCartCount(items) {
        const totalItems = items.reduce((total, item) => total + item.quantity, 0);
        if (cartCount) {
            cartCount.textContent = totalItems;
        }
    }

    // Initialize cart on page load
    initializeCart();

    // Add event listener for checkout button
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }
}); 