import React, { useEffect, useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

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
    queryFn: getCategories,
  });

  useEffect(() => {
    if (categories && categories.length > 0 && !dataInput.category) {
      setDataInput((prev) => ({
        ...prev,
        category: categories[0]._id,
      }));
    }
  }, [categories]);

  const { mutate: submitComment, isPending } = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      toast.success('Commentaire ajouté avec succès !');
      setDataInput({ title: '', category: categories?.[0]?._id || '', message: '' });
    },
    onError: (error) => {
      toast.error(`Erreur : ${error.message || 'Une erreur est survenue.'}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title: dataInput.title,
      content: dataInput.message,
      categoryId: dataInput.category,
    };

    submitComment(payload);
  };

  if (isLoadingCategories) return <div>Chargement des catégories...</div>;
  if (isErrorCategories) return <div>Erreur: {errorCategories.message}</div>;

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title">Titre :</label>
        <input
          type="text"
          name="title"
          id="title"
          value={dataInput.title}
          onChange={(e) => setDataInput({ ...dataInput, title: e.target.value })}
        />
      </div>

      <div className="field">
        <label htmlFor="category">Catégorie :</label>
        <select
          name="category"
          id="category"
          value={dataInput.category}
          onChange={(e) => setDataInput({ ...dataInput, category: e.target.value })}
        >
          {categories &&
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
              </option>
            ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="content">Votre message :</label>
        <textarea
          name="content"
          id="content"
          rows={5}
          value={dataInput.message}
          onChange={(e) => setDataInput({ ...dataInput, message: e.target.value })}
        ></textarea>
      </div>

      <div className="field txt-right">
        <button type="submit" disabled={isPending}>
          {isPending ? 'Envoi en cours...' : 'Envoyer'}
        </button>
      </div>
    </form>
  );
}
