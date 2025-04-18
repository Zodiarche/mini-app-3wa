import React from 'react';
import { test, expect, describe, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Home } from './Home';
import { renderWithProviders } from '../tests/test-utils';

describe('Home - Tests d’intégration', () => {
  vi.mock('../utils/api', () => ({
    getCategories: () =>
      Promise.resolve([
        { _id: '1', name: 'positif' },
        { _id: '2', name: 'critique' },
      ]),
  }));

  test('clique sur une catégorie et vérifie la classe active', async () => {
    renderWithProviders(<Home />);
    const user = userEvent.setup();

    const reactBtn = await screen.findByText('Positif');

    expect(reactBtn).toBeInTheDocument();

    await user.click(screen.getByText('Positif'));

    expect(screen.getByText('Positif')).toHaveClass('active');
    expect(screen.getByText('Critique')).not.toHaveClass('active');
  });
});
