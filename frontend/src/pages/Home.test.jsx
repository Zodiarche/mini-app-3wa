import React from 'react';
import { test, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { Home } from './Home';
import { renderWithProviders } from '../tests/test-utils';

test('Affiche le h1', () => {
  renderWithProviders(<Home />);
  expect(screen.getByText('Liste des commentaires')).toBeInTheDocument();
});
