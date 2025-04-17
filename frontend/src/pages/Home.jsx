import React, { useState } from 'react';
import { Categories } from '../components/Categories/Categories';
import { Comments } from '../components/Comments/Comments';
import { comments } from '../data/comments';

export function Home() {
  const [category, setCategory] = useState('all');
  const filteredComment =
    category === 'all' ? comments : comments.filter((comment) => comment.category === category);
  return (
    <main id="main">
      <section id="list-comments">
        <div className="wrapper">
          <h1>Listes des commentaires</h1>

          <Categories setCategory={setCategory} category={category} />

          <Comments filteredComment={filteredComment} />
        </div>
      </section>
    </main>
  );
}
