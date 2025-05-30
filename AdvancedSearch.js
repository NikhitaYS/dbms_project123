import React, { useState } from 'react';
import '../styles/AdvancedSearch.css';

function AdvancedSearch({ onSearch }) {
  const [filters, setFilters] = useState({
    priceRange: 'all',
    rating: 'all',
    dietary: [],
    sortBy: 'popularity'
  });

  const dietaryOptions = [
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'gluten-free', label: 'Gluten Free' },
    { id: 'spicy', label: 'Spicy' }
  ];

  const handleFilterChange = (type, value) => {
    if (type === 'dietary') {
      const updatedDietary = filters.dietary.includes(value)
        ? filters.dietary.filter(item => item !== value)
        : [...filters.dietary, value];
      
      setFilters(prev => ({
        ...prev,
        dietary: updatedDietary
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [type]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <div className="advanced-search">
      <form onSubmit={handleSubmit}>
        <div className="filter-group">
          <label>Price Range:</label>
          <select
            value={filters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
          >
            <option value="all">All Prices</option>
            <option value="low">Under $10</option>
            <option value="medium">$10 - $20</option>
            <option value="high">Over $20</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Rating:</label>
          <select
            value={filters.rating}
            onChange={(e) => handleFilterChange('rating', e.target.value)}
          >
            <option value="all">All Ratings</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
            <option value="2">2+ Stars</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Dietary Preferences:</label>
          <div className="dietary-options">
            {dietaryOptions.map(option => (
              <label key={option.id} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={filters.dietary.includes(option.id)}
                  onChange={() => handleFilterChange('dietary', option.id)}
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <label>Sort By:</label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          >
            <option value="popularity">Popularity</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Apply Filters</button>
      </form>
    </div>
  );
}

export default AdvancedSearch; 