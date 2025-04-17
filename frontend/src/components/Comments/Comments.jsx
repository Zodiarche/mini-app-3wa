import React from 'react';

import { CommentCard } from './CommentCard';

export function Comments({ filteredComment }) {
  return (
    <div className="CommentsContainer">
      <ul>
        {filteredComment?.map(({ title, message, category, date, id }) => (
          <CommentCard key={id} title={title} message={message} category={category} date={date} />
        ))}
      </ul>
    </div>
  );
}
