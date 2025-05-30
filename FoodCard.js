import React from 'react';
import '../styles/FoodCard.css';

function FoodCard({ food }) {
  return (
    <div className="food-card">
      <div className="food-image">
        <img src={food.image} alt={food.name} />
      </div>
      <div className="food-info">
        <h3>{food.name}</h3>
        <p className="description">{food.description}</p>
        <div className="food-meta">
          <span className="price">${food.price.toFixed(2)}</span>
          <span className="rating">★ {food.rating}</span>
        </div>
        <div className="food-tags">
          <span className="category">{food.category}</span>
          {food.dietary.map(diet => (
            <span key={diet} className="dietary">{diet}</span>
          ))}
        </div>
        <button className="add-to-cart">Add to Cart</button>
      </div>
    </div>
  );
}

export default FoodCard; 