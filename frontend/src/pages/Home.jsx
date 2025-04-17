import React, { useState } from 'react';

import { Categories } from '../components/Categories/Categories';
import { Comments } from '../components/Comments/Comments';

export const Home = () => {
  const [category, setCategory] = useState('all');

  return (
    <main id="main">
      <section id="list-comments">
        <div className="wrapper">
          <h1>Listes des commentaires</h1>

          <Categories category={category} setCategory={setCategory} />
          <Comments />
        </div>
      </section>
    </main>
  );
};
