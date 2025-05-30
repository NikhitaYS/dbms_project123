// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount();

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Mobile menu toggle
const createMobileMenu = () => {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    
    // Add mobile menu button to navbar
    navbar.insertBefore(mobileMenuBtn, navLinks);
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('show') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
};

// Initialize mobile menu if on mobile device
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add animation to feature cards on scroll
const animateOnScroll = () => {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const triggerBottom = window.innerHeight * 0.8;
        
        if (cardTop < triggerBottom) {
            card.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

// Initialize animations
animateOnScroll();

// Add success message styles
const style = document.createElement('style');
style.textContent = `
    .success-message {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 1rem 2rem;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .feature-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }

    .feature-card.animate {
        opacity: 1;
        transform: translateY(0);
    }

    .mobile-menu-btn {
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #333;
        cursor: pointer;
    }

    @media (max-width: 768px) {
        .mobile-menu-btn {
            display: block;
        }

        .nav-links {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background-color: white;
            padding: 1rem;
            flex-direction: column;
            align-items: center;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            transform: translateY(-100%);
            transition: transform 0.3s ease;
        }

        .nav-links.show {
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style); 