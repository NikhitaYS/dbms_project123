const API_URL = 'http://localhost:5000/api';

// Helper function to handle API requests
const apiRequest = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers
    };

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

// Auth API
const auth = {
    register: (userData) => apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
    }),
    login: (credentials) => apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
    }),
    getProfile: () => apiRequest('/auth/me'),
    updateProfile: (userData) => apiRequest('/auth/updatedetails', {
        method: 'PUT',
        body: JSON.stringify(userData)
    }),
    updatePassword: (passwordData) => apiRequest('/auth/updatepassword', {
        method: 'PUT',
        body: JSON.stringify(passwordData)
    })
};

// Menu API
const menu = {
    getItems: (filters = {}) => {
        const queryParams = new URLSearchParams(filters).toString();
        return apiRequest(`/menu?${queryParams}`);
    },
    getItem: (id) => apiRequest(`/menu/${id}`),
    createItem: (itemData) => apiRequest('/menu', {
        method: 'POST',
        body: JSON.stringify(itemData)
    }),
    updateItem: (id, itemData) => apiRequest(`/menu/${id}`, {
        method: 'PUT',
        body: JSON.stringify(itemData)
    }),
    deleteItem: (id) => apiRequest(`/menu/${id}`, {
        method: 'DELETE'
    })
};

// Cart API
const cart = {
    getCart: () => apiRequest('/cart'),
    addItem: (menuItemId, quantity) => apiRequest('/cart/items', {
        method: 'POST',
        body: JSON.stringify({ menuItemId, quantity })
    }),
    updateItem: (menuItemId, quantity) => apiRequest(`/cart/items/${menuItemId}`, {
        method: 'PUT',
        body: JSON.stringify({ quantity })
    }),
    removeItem: (menuItemId) => apiRequest(`/cart/items/${menuItemId}`, {
        method: 'DELETE'
    }),
    clearCart: () => apiRequest('/cart', {
        method: 'DELETE'
    })
};

// Order API
const order = {
    createOrder: (orderData) => apiRequest('/orders', {
        method: 'POST',
        body: JSON.stringify(orderData)
    }),
    getUserOrders: () => apiRequest('/orders'),
    getOrder: (id) => apiRequest(`/orders/${id}`),
    updateOrderStatus: (id, status) => apiRequest(`/orders/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status })
    })
};

// Export API services
window.api = {
    auth,
    menu,
    cart,
    order
}; 