import React from 'react';
import { useParams } from 'react-router-dom';

function RestaurantProfile() {
  const { id } = useParams();
  const restaurant = {
    id: id,
    name: 'Sample Restaurant',
    location: '123 Main St, City',
    rating: 4.5,
    menu: [
      { id: 1, name: 'Margherita Pizza', price: 10.99 },
      { id: 2, name: 'Chicken Curry', price: 12.99 },
      { id: 3, name: 'Sushi Roll', price: 15.99 }
    ]
  };

  return (
    <div>
      <h1>{restaurant.name}</h1>
      <p>Location: {restaurant.location}</p>
      <p>Rating: {restaurant.rating}</p>
      <h2>Menu</h2>
      <ul>
        {restaurant.menu.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RestaurantProfile; 