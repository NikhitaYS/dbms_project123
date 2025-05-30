import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Margherita Pizza', price: 10.99, quantity: 2 },
    { id: 2, name: 'Chicken Curry', price: 12.99, quantity: 1 }
  ]);

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const totalCost = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>Price: ${item.price}</p>
          <p>Quantity: 
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
            />
          </p>
          <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
        </div>
      ))}
      <h2>Total Cost: ${totalCost.toFixed(2)}</h2>
      <Link to="/checkout">
        <button>Checkout</button>
      </Link>
    </div>
  );
}

export default Cart; 