import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

export function Form() {
  const [dataInput, setDataInput] = useState({ title: '', category: '', message: '' });

  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
    error: errorCategories,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: () =>
      fetch(`http://localhost:5000/api/categories`).then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      }),
    cacheTime: 0,
  });

  if (isLoadingCategories) return <div>Chargement...</div>;
  if (isErrorCategories) return <div>Erreur: {errorCategories.message}</div>;

  return (
    <form>
      <div className="field">
        <label htmlFor="title">Titre :</label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={(e) => setDataInput({ ...dataInput, title: e.target.value })}
        />
      </div>

      <div className="field">
        <label htmlFor="category">Choisir la catégorie :</label>
        <select
          name="category"
          id="category"
          onChange={(e) => setDataInput({ ...dataInput, category: e.target.value })}
        >
          {categories &&
            categories.map((category) => (
              <option
                key={category.id}
                value={category.name.charAt(0).toUpperCase() + category.name.slice(1)}
              >
                {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
              </option>
            ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="content">Votre avis :</label>
        <textarea
          name="content"
          id="content"
          rows={5}
          onChange={(e) => setDataInput({ ...dataInput, message: e.target.value })}
        ></textarea>
      </div>

      <div className="field txt-right">
        <button type="submit">Envoyer</button>
      </div>
    </form>
  );
}
