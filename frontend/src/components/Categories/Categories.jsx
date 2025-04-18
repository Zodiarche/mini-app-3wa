import React from 'react';

import { useQuery } from '@tanstack/react-query';

import { CategoryCard } from './CategoryCard';

import { getCategories } from '../../utils/api';

export function Categories({ setCategory, category }) {
  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
    error: errorCategories,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  });

  if (isLoadingCategories) return <div>Chargement...</div>;
  if (isErrorCategories) return <div>Erreur: {errorCategories.message}</div>;

  return (
    <div className="CategoriesContainer">
      <ul>
        {/* FIXME: Plutôt que mettre la logique dans les <li>, faudrait mettre la logique dans un <a> */}
        <li className={`${category === 'all' ? 'active' : ''}`} onClick={() => setCategory('all')}>
          Tous
        </li>

        {categories.map((element) => (
          <CategoryCard
            key={element._id}
            name={element.name}
            setCategory={setCategory}
            category={category}
          />
        ))}
      </ul>
    </div>
  );
}
