import React from 'react';
import '../styles/CategoryFilter.css';

function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="category-filter">
      <button
        className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
        onClick={() => onSelectCategory('all')}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
          onClick={() => onSelectCategory(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter; 