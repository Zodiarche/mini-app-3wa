import React from 'react';

export function CommentCard({ title, message, date, category }) {
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
      <p> Catégorie : {category} </p>
      <p> {message} </p>
      <p className="date"> {new Date(date).toLocaleDateString('fr-FR', options)} </p>
    </li>
  );
}
