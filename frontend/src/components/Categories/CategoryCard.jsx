import React from 'react';

export function CategoryCard({ name, setCategory, category }) {
  return (
    <li className={`${category === name ? 'active' : ''}`} onClick={() => setCategory(name)}>
      {name.charAt(0).toUpperCase() + name.slice(1)}
    </li>
  );
}
