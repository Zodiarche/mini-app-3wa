import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { CommentCard } from './CommentCard';

import { getCategories, getComments } from '../../utils/api';

export const Comments = () => {
  const {
    data: comments,
    isLoading: isLoadingComments,
    isError: isErrorComments,
    error: errorComments,
  } = useQuery({
    queryKey: ['comments'],
    queryFn: () => getComments(),
  });

  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
    error: errorCategories,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  });

  if (isLoadingComments || isLoadingCategories) return <div>Chargement...</div>;
  if (isErrorComments) return <div>Erreur: {errorComments.message}</div>;
  if (isErrorCategories) return <div>Erreur: {errorCategories.message}</div>;

  return (
    <div className="CommentsContainer">
      <ul>
        {comments?.map(({ id, title, content, category: categoryId, createdAt }, index) => {
          const categoryObj = categories?.find((categorie) => categorie.id === categoryId);
          const categoryName =
            categoryObj?.name.charAt(0).toUpperCase() + categoryObj?.name.slice(1) ||
            'Catégorie inconnue';

          return (
            <CommentCard
              key={id || index}
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
