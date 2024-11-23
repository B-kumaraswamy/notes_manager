// components/SearchBar.js
import React from 'react';

function SearchBar({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Others">Others</option>
      </select>
    </div>
  );
}

export default SearchBar;