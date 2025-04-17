import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { CommentCard } from './CommentCard';

export const Comments = () => {
  const {
    data: comments,
    isLoading: isLoadingComments,
    isError: isErrorComments,
    error: errorComments,
  } = useQuery({
    queryKey: ['comments'],
    queryFn: () =>
      fetch(`http://localhost:5000/api/comments`).then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      }),
    cacheTime: 0,
  });

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

  if (isLoadingComments || isLoadingCategories) return <div>Chargement...</div>;
  if (isErrorComments) return <div>Erreur: {errorComments.message}</div>;
  if (isErrorCategories) return <div>Erreur: {errorCategories.message}</div>;

  return (
    <div className="CommentsContainer">
      <ul>
        {comments?.map(({ title, content, category: categoryId, createdAt, id }) => {
          const categoryObj = categories?.find((categorie) => categorie.id === categoryId);
          const categoryName =
            categoryObj?.name.charAt(0).toUpperCase() + categoryObj?.name.slice(1) ||
            'Catégorie inconnue';

          return (
            <CommentCard
              key={id}
              title={title}
              content={content}
              categoryName={categoryName}
              createdAt={createdAt}
            />
          );
        })}
      </ul>
    </div>
  );
};
