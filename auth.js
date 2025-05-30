// Authentication functionality
class Auth {
    constructor() {
        this.user = JSON.parse(localStorage.getItem('user')) || null;
        this.updateAuthUI();
    }

    async login(email, password) {
        try {
            // In a real application, this would be an API call
            // For demo purposes, we'll simulate a successful login
            const user = {
                id: '1',
                email: email,
                name: 'Demo User',
                token: 'demo-token'
            };

            this.user = user;
            localStorage.setItem('user', JSON.stringify(user));
            this.updateAuthUI();
            this.showNotification('Successfully logged in!');
            return true;
        } catch (error) {
            this.showNotification('Login failed. Please try again.', 'error');
            return false;
        }
    }

    async register(name, email, password) {
        try {
            // In a real application, this would be an API call
            // For demo purposes, we'll simulate a successful registration
            const user = {
                id: '1',
                email: email,
                name: name,
                token: 'demo-token'
            };

            this.user = user;
            localStorage.setItem('user', JSON.stringify(user));
            this.updateAuthUI();
            this.showNotification('Successfully registered!');
            return true;
        } catch (error) {
            this.showNotification('Registration failed. Please try again.', 'error');
            return false;
        }
    }

    logout() {
        this.user = null;
        localStorage.removeItem('user');
        this.updateAuthUI();
        this.showNotification('Successfully logged out!');
        window.location.href = '/index.html';
    }

    isAuthenticated() {
        return !!this.user;
    }

    updateAuthUI() {
        const loginBtn = document.querySelector('.login-btn');
        const userMenu = document.querySelector('.user-menu');
        
        if (this.isAuthenticated()) {
            if (loginBtn) loginBtn.style.display = 'none';
            if (userMenu) {
                userMenu.style.display = 'flex';
                const userName = userMenu.querySelector('.user-name');
                if (userName) userName.textContent = this.user.name;
            }
        } else {
            if (loginBtn) loginBtn.style.display = 'block';
            if (userMenu) userMenu.style.display = 'none';
        }
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

    // Form validation
    validateLoginForm(email, password) {
        if (!email || !password) {
            this.showNotification('Please fill in all fields', 'error');
            return false;
        }
        if (!this.validateEmail(email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return false;
        }
        return true;
    }

    validateRegisterForm(name, email, password, confirmPassword) {
        if (!name || !email || !password || !confirmPassword) {
            this.showNotification('Please fill in all fields', 'error');
            return false;
        }
        if (!this.validateEmail(email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return false;
        }
        if (password.length < 6) {
            this.showNotification('Password must be at least 6 characters long', 'error');
            return false;
        }
        if (password !== confirmPassword) {
            this.showNotification('Passwords do not match', 'error');
            return false;
        }
        return true;
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}

// Initialize auth
const auth = new Auth();

// Export auth instance
window.auth = auth;

// Add event listeners for auth forms
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const logoutBtn = document.querySelector('.logout-btn');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = loginForm.querySelector('[name="email"]').value;
            const password = loginForm.querySelector('[name="password"]').value;

            if (auth.validateLoginForm(email, password)) {
                const success = await auth.login(email, password);
                if (success) {
                    window.location.href = '/index.html';
                }
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = registerForm.querySelector('[name="name"]').value;
            const email = registerForm.querySelector('[name="email"]').value;
            const password = registerForm.querySelector('[name="password"]').value;
            const confirmPassword = registerForm.querySelector('[name="confirmPassword"]').value;

            if (auth.validateRegisterForm(name, email, password, confirmPassword)) {
                const success = await auth.register(name, email, password);
                if (success) {
                    window.location.href = '/index.html';
                }
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            auth.logout();
        });
    }
}); 