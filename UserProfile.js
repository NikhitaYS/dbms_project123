import React, { useState } from 'react';

function UserProfile() {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    addresses: ['123 Main St, City', '456 Oak St, Town']
  });

  const [newAddress, setNewAddress] = useState('');

  const handleAddressChange = (e) => {
    setNewAddress(e.target.value);
  };

  const handleAddAddress = () => {
    if (newAddress) {
      setUserData({
        ...userData,
        addresses: [...userData.addresses, newAddress]
      });
      setNewAddress('');
    }
  };

  const handleRemoveAddress = (index) => {
    setUserData({
      ...userData,
      addresses: userData.addresses.filter((_, i) => i !== index)
    });
  };

  return (
    <div>
      <h1>User Profile</h1>
      <div>
        <h2>Personal Information</h2>
        <p>Name: {userData.name}</p>
        <p>Email: {userData.email}</p>
        <p>Phone: {userData.phone}</p>
      </div>
      <div>
        <h2>Addresses</h2>
        <ul>
          {userData.addresses.map((address, index) => (
            <li key={index}>
              {address}
              <button onClick={() => handleRemoveAddress(index)}>Remove</button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={newAddress}
          onChange={handleAddressChange}
          placeholder="Add new address"
        />
        <button onClick={handleAddAddress}>Add Address</button>
      </div>
    </div>
  );
}

export default UserProfile; 