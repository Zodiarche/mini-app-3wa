import React from 'react';
import { Link } from 'react-router-dom';

import { Form } from '../components/Form/Form';

export function FormPage() {
  return (
    <main id="form">
      <section id="add-comment">
        <div className="wrapper">
          <div className="txt-right">
            <Link to="/" className="btn">
              Retourner à l'accueil
            </Link>
          </div>

          <h1>Ajouter un commentaire</h1>

          <Form />
        </div>
      </section>
    </main>
  );
}
