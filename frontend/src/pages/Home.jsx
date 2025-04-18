import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Categories } from '../components/Categories/Categories';
import { Comments } from '../components/Comments/Comments';

export const Home = () => {
  const [category, setCategory] = useState('all');

  return (
    <main id="main">
      <section id="list-comments">
        <div className="wrapper">
          <div className="txt-right">
            <Link to="/form" className="btn">
              Ajouter un commentaire
            </Link>
          </div>

          <h1>Liste des commentaires</h1>

          <Categories category={category} setCategory={setCategory} />
          <Comments />
        </div>
      </section>
    </main>
  );
};
