import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { CommentCard } from './CommentCard';

import { getCategories, getComments, getCommentsByCategory } from '../../utils/api';

export const Comments = ({ selectedCategory }) => {
  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
    error: errorCategories,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const {
    data: comments,
    isLoading: isLoadingComments,
    isError: isErrorComments,
    error: errorComments,
  } = useQuery({
    enabled: !!categories,
    queryKey: ['comments', selectedCategory],
    queryFn: () => {
      if (selectedCategory === 'all') {
        return getComments();
      }

      const categoryObj = categories?.find(
        (cat) => cat.name.toLowerCase() === selectedCategory.toLowerCase()
      );

      const categoryId = categoryObj?._id;

      if (!categoryId) {
        return Promise.resolve([]);
      }

      return getCommentsByCategory(categoryId);
    },
  });

  if (isLoadingComments || isLoadingCategories) return <div>Chargement...</div>;
  if (isErrorComments) return <div>Erreur: {errorComments.message}</div>;
  if (isErrorCategories) return <div>Erreur: {errorCategories.message}</div>;

  return (
    <div className="CommentsContainer">
      <ul>
        {comments?.map(({ title, content, categoryId, createdAt }, index) => {
          const categoryObj = categories?.find((categorie) => {
            return categorie._id === categoryId;
          });
          const categoryName =
            categoryObj?.name.charAt(0).toUpperCase() + categoryObj?.name.slice(1) ||
            'Catégorie inconnue';

          return (
            <CommentCard
              key={index}
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
