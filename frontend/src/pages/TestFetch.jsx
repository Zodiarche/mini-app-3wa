import React, { useEffect, useState } from 'react';

const TestFetch = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/comments')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
      })
      .then((json) => setData(json))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h2>TestFetch</h2>

      {error && <p style={{ color: 'red' }}>Erreur : {error}</p>}

      {!error && !data && <p>Chargement...</p>}

      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default TestFetch;
