import React from 'react';
import { categories } from '../../data/categories';
import { CategoryCard } from './CategoryCard';

export function Categories({ setCategory, category }) {
  return (
    <div className="CategoriesContainer">
      <ul>
        {/* FIXME: Plutôt que mettre la logique dans les <li>, faudrait mettre la logique dans un <a> */}
        <li className={`${category === 'all' ? 'active' : ''}`} onClick={() => setCategory('all')}>
          Tous
        </li>

        {categories.map((element, index) => (
          <CategoryCard key={index} name={element} setCategory={setCategory} category={category} />
        ))}
      </ul>
    </div>
  );
}
