import React from 'react';
import { test, expect, describe, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form } from './Form';
import { renderWithProviders } from '../../tests/test-utils';

const mockAddComment = vi.fn();

vi.mock('../../utils/api', () => ({
  getCategories: () =>
    Promise.resolve([
      { _id: '123', name: 'Positif' },
      { _id: '456', name: 'Suggestion' },
    ]),
  addComment: (payload) => {
    mockAddComment(payload);
    return Promise.resolve(); // succès
  },
}));

describe('Form - test d’intégration', () => {
  test('remplit et envoie le formulaire', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Form />);

    const titleInput = await screen.findByLabelText(/titre/i);
    const messageInput = screen.getByLabelText(/votre message/i);
    const select = screen.getByLabelText(/catégorie/i);
    const submitBtn = screen.getByRole('button', { name: /envoyer/i });

    // Remplir le formulaire
    await user.type(titleInput, 'TITRE');
    await user.selectOptions(select, '456');
    await user.type(messageInput, 'Ceci est un test.');

    // Soumettre
    await user.click(submitBtn);

    // Vérifier que l’API addComment a bien été appelée
    expect(mockAddComment).toHaveBeenCalledWith({
      title: 'TITRE',
      content: 'Ceci est un test.',
      categoryId: '456',
    });
  });
});
