import React from 'react';

export function CommentCard({ title, content, createdAt, categoryName }) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  return (
    <li>
      <h2>{title}</h2>
      <p> Catégorie : {categoryName} </p>
      <p> {content} </p>
      <p className="date"> {new Date(createdAt).toLocaleDateString('fr-FR', options)} </p>
    </li>
  );
}
