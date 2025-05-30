import React from 'react';

function OrderHistory() {
  const orders = [
    { id: 1, items: ['Margherita Pizza', 'Chicken Curry'], status: 'Delivered', time: '2023-10-01 12:00 PM' },
    { id: 2, items: ['Sushi Roll', 'Burger'], status: 'In Transit', time: '2023-10-02 01:30 PM' }
  ];

  return (
    <div>
      <h1>Order History</h1>
      {orders.map((order) => (
        <div key={order.id}>
          <h3>Order #{order.id}</h3>
          <p>Items: {order.items.join(', ')}</p>
          <p>Status: {order.status}</p>
          <p>Time: {order.time}</p>
        </div>
      ))}
    </div>
  );
}

export default OrderHistory; 