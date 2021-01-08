import React from 'react';
import './searchbox.css';

export default function SearchBox({ placeholder, handleChange }) {
  return (
    <input
      type="search"
      className="search"
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
}
