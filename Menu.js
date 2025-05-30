import React, { useState, useEffect } from 'react';
import FoodCard from '../components/FoodCard';
import SearchBar from '../components/SearchBar';
import AdvancedSearch from '../components/AdvancedSearch';
import VoiceOrder from '../components/VoiceOrder';
import '../styles/Menu.css';

// Import images
import butterChicken from '../assets/images/Butter Chicken.jpg';
import masalaDosa from '../assets/images/Masala-Dosa.jpg';
import biryani from '../assets/images/Mutton biriyani.jpg';
import paniPuri from '../assets/images/Pani Puri.jpg';
import pavBhaji from '../assets/images/Pav Bhaji.jpg';
import samosa from '../assets/images/Samosa.jpg';

function Menu() {
  const [foodItems, setFoodItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  // Sample food items data
  useEffect(() => {
    const sampleItems = [
      {
        id: 1,
        name: 'Butter Chicken',
        price: 14.99,
        rating: 4.5,
        image: butterChicken,
        description: 'Tender chicken in a rich, creamy tomato-based curry',
        category: 'Indian',
        dietary: ['spicy']
      },
      {
        id: 2,
        name: 'Masala Dosa',
        price: 8.99,
        rating: 4.3,
        image: masalaDosa,
        description: 'Crispy dosa filled with spiced potato filling',
        category: 'South Indian',
        dietary: ['vegetarian']
      },
      {
        id: 3,
        name: 'Mutton Biryani',
        price: 16.99,
        rating: 4.7,
        image: biryani,
        description: 'Fragrant basmati rice cooked with tender mutton and aromatic spices',
        category: 'Indian',
        dietary: ['spicy']
      },
      {
        id: 4,
        name: 'Pani Puri',
        price: 6.99,
        rating: 4.4,
        image: paniPuri,
        description: 'Crispy puris filled with spiced water, tamarind chutney, and potatoes',
        category: 'Street Food',
        dietary: ['vegetarian']
      },
      {
        id: 5,
        name: 'Pav Bhaji',
        price: 7.99,
        rating: 4.2,
        image: pavBhaji,
        description: 'Spiced vegetable curry served with buttered bread rolls',
        category: 'Street Food',
        dietary: ['vegetarian']
      },
      {
        id: 6,
        name: 'Samosa',
        price: 4.99,
        rating: 4.1,
        image: samosa,
        description: 'Crispy pastry filled with spiced potatoes and peas',
        category: 'Snacks',
        dietary: ['vegetarian']
      }
    ];
    setFoodItems(sampleItems);
    setFilteredItems(sampleItems);
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = foodItems.filter(item =>
      item.name.toLowerCase().includes(term.toLowerCase()) ||
      item.description.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleAdvancedSearch = (filters) => {
    let filtered = [...foodItems];

    // Apply price filter
    if (filters.priceRange !== 'all') {
      filtered = filtered.filter(item => {
        switch (filters.priceRange) {
          case 'low': return item.price < 10;
          case 'medium': return item.price >= 10 && item.price <= 20;
          case 'high': return item.price > 20;
          default: return true;
        }
      });
    }

    // Apply rating filter
    if (filters.rating !== 'all') {
      filtered = filtered.filter(item => item.rating >= parseInt(filters.rating));
    }

    // Apply dietary filters
    if (filters.dietary.length > 0) {
      filtered = filtered.filter(item =>
        filters.dietary.some(diet => item.dietary.includes(diet))
      );
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // popularity sorting would require additional data
        break;
    }

    setFilteredItems(filtered);
  };

  const handleVoiceCommand = (transcript) => {
    // Process voice command
    const command = transcript.toLowerCase();
    
    if (command.includes('search')) {
      const searchTerm = command.replace('search', '').trim();
      handleSearch(searchTerm);
    } else if (command.includes('filter')) {
      setShowAdvancedSearch(true);
    } else if (command.includes('add')) {
      // Handle adding items to cart
      const itemName = command.replace('add', '').trim();
      const item = foodItems.find(item => 
        item.name.toLowerCase().includes(itemName)
      );
      if (item) {
        // Add to cart logic here
        console.log('Adding to cart:', item);
      }
    }
  };

  return (
    <div className="menu-page">
      <div className="search-section">
        <SearchBar onSearch={handleSearch} />
        <button 
          className="btn btn-secondary"
          onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
        >
          {showAdvancedSearch ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {showAdvancedSearch && (
        <AdvancedSearch onSearch={handleAdvancedSearch} />
      )}

      <div className="food-grid">
        {filteredItems.map(item => (
          <FoodCard key={item.id} food={item} />
        ))}
      </div>

      <VoiceOrder onVoiceCommand={handleVoiceCommand} />
    </div>
  );
}

export default Menu; 