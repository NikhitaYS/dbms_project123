import React from 'react';

function AdminDashboard() {
  const orders = [
    { id: 1, user: 'User1', items: ['Pizza', 'Burger'], status: 'Delivered' },
    { id: 2, user: 'User2', items: ['Sushi', 'Curry'], status: 'In Transit' }
  ];

  const users = [
    { id: 1, name: 'User1', email: 'user1@example.com' },
    { id: 2, name: 'User2', email: 'user2@example.com' }
  ];

  const menuItems = [
    { id: 1, name: 'Margherita Pizza', price: 10.99 },
    { id: 2, name: 'Chicken Curry', price: 12.99 }
  ];

  const handleDeleteOrder = (id) => {
    // TODO: Implement delete order functionality
    console.log('Delete order:', id);
  };

  const handleDeleteUser = (id) => {
    // TODO: Implement delete user functionality
    console.log('Delete user:', id);
  };

  const handleDeleteMenuItem = (id) => {
    // TODO: Implement delete menu item functionality
    console.log('Delete menu item:', id);
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Orders</h2>
      {orders.map((order) => (
        <div key={order.id}>
          <h3>Order #{order.id}</h3>
          <p>User: {order.user}</p>
          <p>Items: {order.items.join(', ')}</p>
          <p>Status: {order.status}</p>
          <button onClick={() => handleDeleteOrder(order.id)}>Delete</button>
        </div>
      ))}
      <h2>Users</h2>
      {users.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
        </div>
      ))}
      <h2>Menu Items</h2>
      {menuItems.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>Price: ${item.price}</p>
          <button onClick={() => handleDeleteMenuItem(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard; 