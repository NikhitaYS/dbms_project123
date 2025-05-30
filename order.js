// Order functionality
class Order {
    constructor() {
        this.orders = JSON.parse(localStorage.getItem('orders')) || [];
    }

    async placeOrder(orderData) {
        try {
            // In a real application, this would be an API call
            // For demo purposes, we'll simulate a successful order
            const order = {
                id: Date.now().toString(),
                ...orderData,
                status: 'pending',
                createdAt: new Date().toISOString()
            };

            this.orders.push(order);
            this.saveOrders();
            this.showNotification('Order placed successfully!');
            return order;
        } catch (error) {
            this.showNotification('Failed to place order. Please try again.', 'error');
            return null;
        }
    }

    async getOrders() {
        // In a real application, this would be an API call
        return this.orders;
    }

    async getOrderById(orderId) {
        return this.orders.find(order => order.id === orderId);
    }

    async updateOrderStatus(orderId, status) {
        const order = this.orders.find(order => order.id === orderId);
        if (order) {
            order.status = status;
            this.saveOrders();
            this.showNotification(`Order status updated to ${status}`);
            return true;
        }
        return false;
    }

    saveOrders() {
        localStorage.setItem('orders', JSON.stringify(this.orders));
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    renderOrderHistory() {
        const orderHistoryContainer = document.querySelector('.order-history');
        if (!orderHistoryContainer) return;

        const orders = this.orders.sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
        );

        orderHistoryContainer.innerHTML = orders.map(order => `
            <div class="order-card">
                <div class="order-header">
                    <h3>Order #${order.id}</h3>
                    <span class="order-status ${order.status}">${order.status}</span>
                </div>
                <div class="order-details">
                    <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
                    <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
                    <p><strong>Items:</strong> ${order.items.length}</p>
                </div>
                <div class="order-items">
                    ${order.items.map(item => `
                        <div class="order-item">
                            <span>${item.name} x${item.quantity}</span>
                            <span>$${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    validateOrderForm(orderData) {
        if (!orderData.address || !orderData.phone) {
            this.showNotification('Please fill in all required fields', 'error');
            return false;
        }
        if (!this.validatePhone(orderData.phone)) {
            this.showNotification('Please enter a valid phone number', 'error');
            return false;
        }
        return true;
    }

    validatePhone(phone) {
        const re = /^\+?[\d\s-]{10,}$/;
        return re.test(phone);
    }
}

// Initialize order
const order = new Order();

// Export order instance
window.order = order;

// Add event listeners for order form
document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('orderForm');
    const orderHistoryContainer = document.querySelector('.order-history');

    if (orderForm) {
        orderForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(orderForm);
            const orderData = {
                address: formData.get('address'),
                phone: formData.get('phone'),
                items: window.cart.items,
                total: window.cart.total,
                notes: formData.get('notes')
            };

            if (order.validateOrderForm(orderData)) {
                const success = await order.placeOrder(orderData);
                if (success) {
                    window.cart.clearCart();
                    window.location.href = '/order-confirmation.html';
                }
            }
        });
    }

    if (orderHistoryContainer) {
        order.renderOrderHistory();
    }
}); 