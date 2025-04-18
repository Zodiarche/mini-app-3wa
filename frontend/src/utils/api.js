const URL = 'http://localhost:5000';

export const getCategories = async () => {
  const response = await fetch(`${URL}/api/categories`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const getComments = async () => {
  const response = await fetch(`${URL}/api/comments`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export async function getCommentsByCategory(categoryId) {
  const response = await fetch(`${URL}/api/comments/${categoryId}`);
  if (!response.ok) throw new Error('Erreur lors du chargement des commentaires par catégorie');

  return response.json();
}

export const addComment = async (data) => {
  const response = await fetch(`${URL}/api/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};
