import React from "react";

export default function SearchBar({ query, onQueryChange, onSearch, onClear, onLucky }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter artist name..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
      <button onClick={onSearch}>Search</button>
      <button onClick={onClear}>Clear</button>
      <button onClick={onLucky}>🎲 Lucky</button>
    </div>
  );
}
