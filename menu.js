// DOM Elements
const menuGrid = document.getElementById('menu-grid');
const searchInput = document.getElementById('search');
const voiceBtn = document.getElementById('voice-btn');
const voiceTranscript = document.getElementById('voice-transcript');
const categoryFilter = document.getElementById('category');
const priceFilter = document.getElementById('price');
const ratingFilter = document.getElementById('rating');
const dietaryFilter = document.getElementById('dietary');
const cartCount = document.getElementById('cart-count');

// State
let menuItems = [];
let filteredItems = [];
let isListening = false;

// Menu items data
const menuItemsData = [
    {
        name: "Aloo Gobi Masala Curry",
        price: 249,
        image: "assets/images/Aloo gobi masala curry.jpg",
        category: "main course",
        rating: 4.5,
        dietary: ["vegetarian"]
    },
    {
        name: "Bhel Puri",
        price: 99,
        image: "assets/images/Bhel puri.jpg",
        category: "appetizers",
        rating: 4.2,
        dietary: ["vegetarian"]
    },
    {
        name: "Butter Chicken",
        price: 349,
        image: "assets/images/Butter Chicken.jpg",
        category: "main course",
        rating: 4.8,
        dietary: []
    },
    {
        name: "Chaat",
        price: 129,
        image: "assets/images/Chaat.jpg",
        category: "appetizers",
        rating: 4.3,
        dietary: ["vegetarian"]
    },
    {
        name: "Chicken Biryani",
        price: 299,
        image: "assets/images/Chiken biriyani.jpg",
        category: "main course",
        rating: 4.7,
        dietary: []
    },
    {
        name: "Chocolate Cake",
        price: 149,
        image: "assets/images/Chocolate cake.jpg",
        category: "desserts",
        rating: 4.6,
        dietary: ["vegetarian"]
    },
    {
        name: "Cupcakes",
        price: 79,
        image: "assets/images/cupcakes.jpg",
        category: "desserts",
        rating: 4.4,
        dietary: ["vegetarian"]
    },
    {
        name: "Dabeli",
        price: 89,
        image: "assets/images/dabeli.jpg",
        category: "appetizers",
        rating: 4.1,
        dietary: ["vegetarian"]
    },
    {
        name: "Dal Makhani",
        price: 229,
        image: "assets/images/Dal Makhani.jpg",
        category: "main course",
        rating: 4.5,
        dietary: ["vegetarian"]
    },
    {
        name: "Donuts",
        price: 59,
        image: "assets/images/Donuts.jpg",
        category: "desserts",
        rating: 4.3,
        dietary: ["vegetarian"]
    },
    {
        name: "Egg Biryani",
        price: 249,
        image: "assets/images/Egg biriyani.jpg",
        category: "main course",
        rating: 4.4,
        dietary: []
    },
    {
        name: "Gulab Jamun",
        price: 99,
        image: "assets/images/Gulab jamun.jpg",
        category: "desserts",
        rating: 4.7,
        dietary: ["vegetarian"]
    },
    {
        name: "Idli Sambar",
        price: 149,
        image: "assets/images/Idli Sambar.jpg",
        category: "main course",
        rating: 4.5,
        dietary: ["vegetarian"]
    },
    {
        name: "Jalebi",
        price: 89,
        image: "assets/images/Jalebi.jpg",
        category: "desserts",
        rating: 4.6,
        dietary: ["vegetarian"]
    },
    {
        name: "Kachori",
        price: 79,
        image: "assets/images/Kachori.jpg",
        category: "appetizers",
        rating: 4.2,
        dietary: ["vegetarian"]
    },
    {
        name: "Masala Dosa",
        price: 179,
        image: "assets/images/Masala-Dosa.jpg",
        category: "main course",
        rating: 4.7,
        dietary: ["vegetarian"]
    },
    {
        name: "Mushroom Biryani",
        price: 249,
        image: "assets/images/Mushroom biriyani.jpg",
        category: "main course",
        rating: 4.4,
        dietary: ["vegetarian"]
    },
    {
        name: "Mutton Biryani",
        price: 349,
        image: "assets/images/Mutton biriyani.jpg",
        category: "main course",
        rating: 4.8,
        dietary: []
    },
    {
        name: "Mysore Pak",
        price: 99,
        image: "assets/images/Mysore pak.jpg",
        category: "desserts",
        rating: 4.5,
        dietary: ["vegetarian"]
    },
    {
        name: "Pizza",
        price: 299,
        image: "assets/images/OIP (1).jpg",
        category: "main course",
        rating: 4.6,
        dietary: ["vegetarian"]
    },
    {
        name: "Pasta",
        price: 249,
        image: "assets/images/OIP (4).jpg",
        category: "main course",
        rating: 4.5,
        dietary: ["vegetarian"]
    },
    {
        name: "South Indian Thali",
        price: 299,
        image: "assets/images/OIP (5).jpg",
        category: "main course",
        rating: 4.7,
        dietary: ["vegetarian"]
    },
    {
        name: "Tandoori Chicken",
        price: 349,
        image: "assets/images/OIP.jpg",
        category: "main course",
        rating: 4.8,
        dietary: []
    },
    {
        name: "Paneer Paratha",
        price: 199,
        image: "assets/images/Paneer Paratha.jpg",
        category: "main course",
        rating: 4.5,
        dietary: ["vegetarian"]
    },
    {
        name: "Pani Puri",
        price: 89,
        image: "assets/images/Pani Puri.jpg",
        category: "appetizers",
        rating: 4.6,
        dietary: ["vegetarian"]
    },
    {
        name: "Pastries",
        price: 79,
        image: "assets/images/Pastries.jpg",
        category: "desserts",
        rating: 4.4,
        dietary: ["vegetarian"]
    },
    {
        name: "Pav Bhaji",
        price: 179,
        image: "assets/images/Pav Bhaji.jpg",
        category: "main course",
        rating: 4.7,
        dietary: ["vegetarian"]
    },
    {
        name: "Rasagulla",
        price: 99,
        image: "assets/images/Rasagulla.jpg",
        category: "desserts",
        rating: 4.6,
        dietary: ["vegetarian"]
    },
    {
        name: "Rasmalai",
        price: 129,
        image: "assets/images/Rasmalai.jpg",
        category: "desserts",
        rating: 4.7,
        dietary: ["vegetarian"]
    },
    {
        name: "Red Velvet Cake",
        price: 149,
        image: "assets/images/Red velvet.jpg",
        category: "desserts",
        rating: 4.8,
        dietary: ["vegetarian"]
    },
    {
        name: "Samosa",
        price: 79,
        image: "assets/images/Samosa.jpg",
        category: "appetizers",
        rating: 4.5,
        dietary: ["vegetarian"]
    },
    {
        name: "Strawberry Cake",
        price: 129,
        image: "assets/images/Strawberry.jpg",
        category: "desserts",
        rating: 4.6,
        dietary: ["vegetarian"]
    },
    {
        name: "Vada Pav",
        price: 89,
        image: "assets/images/Vada Pav.jpg",
        category: "appetizers",
        rating: 4.4,
        dietary: ["vegetarian"]
    },
    {
        name: "Veg Fried Rice",
        price: 229,
        image: "assets/images/Veg fried rice.jpg",
        category: "main course",
        rating: 4.3,
        dietary: ["vegetarian"]
    },
    {
        name: "Veg Pulao",
        price: 199,
        image: "assets/images/Veg pulao.jpg",
        category: "main course",
        rating: 4.4,
        dietary: ["vegetarian"]
    }
];

// Initialize menu items
function initializeMenuItems() {
    menuItems = menuItemsData;
    filteredItems = [...menuItems];
    displayMenuItems();
}

// Display menu items in the grid
function displayMenuItems() {
    menuGrid.innerHTML = '';
    
    if (filteredItems.length === 0) {
        menuGrid.innerHTML = `
            <div class="no-items">
                <p>No items found matching your criteria.</p>
            </div>
        `;
        return;
    }

    filteredItems.forEach(item => {
        const itemElement = createMenuItemElement(item);
        menuGrid.appendChild(itemElement);
    });
}

// Create menu item element
function createMenuItemElement(item) {
    const menuItem = document.createElement('div');
    menuItem.className = 'menu-item';
    menuItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="item-details">
            <h3>${item.name}</h3>
            <p class="price">₹${item.price}</p>
            <div class="rating">
                ${'★'.repeat(Math.floor(item.rating))}${item.rating % 1 ? '½' : ''}${'☆'.repeat(5 - Math.ceil(item.rating))}
                <span>(${item.rating})</span>
            </div>
            <div class="dietary-tags">
                ${item.dietary.map(diet => `<span class="tag">${diet}</span>`).join('')}
            </div>
            <button onclick="addToCart('${item.name}', ${item.price})" class="add-to-cart-btn">
                Add to Cart
            </button>
        </div>
    `;
    return menuItem;
}

// Add item to cart
function addToCart(itemName, price) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = cartItems.find(item => item.name === itemName);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const menuItem = menuItems.find(item => item.name === itemName);
        cartItems.push({
            id: Date.now().toString(),
            name: itemName,
            price: price,
            image: menuItem.image,
            quantity: 1
        });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Update cart count
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    showNotification(`${itemName} added to cart!`, 'success');
}

// Filter menu items
function filterItems() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const price = priceFilter.value;
    const rating = ratingFilter.value;
    const dietary = dietaryFilter.value;

    filteredItems = menuItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || item.category === category;
        const matchesPrice = !price || checkPriceRange(item.price, price);
        const matchesRating = !rating || item.rating >= parseInt(rating);
        const matchesDietary = !dietary || item.dietary.includes(dietary);

        return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesDietary;
    });

    displayMenuItems();
}

// Check if price is within range
function checkPriceRange(price, range) {
    switch (range) {
        case '0-100':
            return price <= 100;
        case '100-200':
            return price > 100 && price <= 200;
        case '200-300':
            return price > 200 && price <= 300;
        case '300+':
            return price > 300;
        default:
            return true;
    }
}

// Voice search functionality
function setupVoiceSearch() {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;
        recognition.lang = 'en-US';

        voiceBtn.addEventListener('click', () => {
            if (!isListening) {
                try {
                    recognition.start();
                    isListening = true;
                    voiceBtn.classList.add('listening');
                    voiceTranscript.textContent = 'Listening...';
                } catch (error) {
                    console.error('Voice recognition error:', error);
                    showNotification('Voice recognition failed to start', 'error');
                }
            } else {
                recognition.stop();
                isListening = false;
                voiceBtn.classList.remove('listening');
                voiceTranscript.textContent = '';
            }
        });

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            searchInput.value = transcript;
            voiceTranscript.textContent = transcript;
            
            clearTimeout(window.voiceSearchTimeout);
            window.voiceSearchTimeout = setTimeout(() => {
                filterItems();
            }, 300);
        };

        recognition.onerror = (event) => {
            console.error('Voice recognition error:', event.error);
            isListening = false;
            voiceBtn.classList.remove('listening');
            voiceTranscript.textContent = 'Error: Could not recognize speech';
            showNotification('Voice recognition failed', 'error');
        };

        recognition.onend = () => {
            isListening = false;
            voiceBtn.classList.remove('listening');
            if (voiceTranscript.textContent === 'Listening...') {
                voiceTranscript.textContent = '';
            }
        };
    } else {
        voiceBtn.style.display = 'none';
        console.warn('Voice recognition not supported in this browser');
    }
}

// UI Helper Functions
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Event Listeners
searchInput.addEventListener('input', filterItems);
categoryFilter.addEventListener('change', filterItems);
priceFilter.addEventListener('change', filterItems);
ratingFilter.addEventListener('change', filterItems);
dietaryFilter.addEventListener('change', filterItems);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeMenuItems();
    setupVoiceSearch();
}); 