import React, { useState } from 'react';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Search query:', searchQuery);
  };

  const categories = ['Pizza', 'Indian', 'Chinese', 'Burgers', 'Sushi'];

  return (
    <div>
      <h1>Welcome to Food Delivery App</h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search for food or restaurants..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category}>{category}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home; 