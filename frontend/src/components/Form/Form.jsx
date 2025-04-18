import React, { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { addComment, getCategories } from '../../utils/api';

export function Form() {
  const [dataInput, setDataInput] = useState({ title: '', category: '', message: '' });

  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
    error: errorCategories,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  });

  useEffect(() => {
    if (categories && categories.length > 0 && !dataInput.category) {
      setDataInput((prev) => ({
        ...prev,
        category: categories[0]._id,
      }));
    }
  }, [categories]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: dataInput.title,
      content: dataInput.message,
      categoryId: dataInput.category,
    };

    try {
      const response = await addComment(payload);
      console.log('Comment added:', response);
      setDataInput({ title: '', category: '', message: '' });
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (isLoadingCategories) return <div>Chargement...</div>;
  if (isErrorCategories) return <div>Erreur: {errorCategories.message}</div>;

  return (
    <form onSubmit={handleSubmit}>
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
            categories.map((category, index) => (
              <option key={index} value={category._id}>
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
