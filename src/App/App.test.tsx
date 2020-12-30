import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  test('should toggle the theme', () => {
    render(<App />);

    userEvent.click(screen.getByRole('button', { name: 'Toggle Dark Theme' }));

    expect(screen.getByRole('button', { name: 'Toggle Light Theme' })).not.toBeNull();
  });
});
