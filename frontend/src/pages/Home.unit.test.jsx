import React from 'react';
import { test, expect, describe, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { Home } from './Home';
import { renderWithProviders } from '../tests/test-utils';

// Séparation des tests unitaires et d’intégration
describe('Home - Tests unitaires (avec mocks)', () => {
  vi.mock('../components/Categories/Categories', () => ({
    Categories: ({ category }) => <div>Mock Categories: {category}</div>,
  }));

  test('affiche le titre, le lien et le mock de Categories', () => {
    renderWithProviders(<Home />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Liste des commentaires' })
    ).toBeInTheDocument();
    const link = screen.getByRole('link', { name: 'Ajouter un commentaire' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/form');
    expect(screen.getByText('Mock Categories: all')).toBeInTheDocument();
  });
});
