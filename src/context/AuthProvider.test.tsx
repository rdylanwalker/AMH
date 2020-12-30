import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthProvider, { useAuth } from './AuthProvider';

describe('AuthProvider', () => {
  const mockOnSuccess = jest.fn();

  const TestComponent = () => {
    const { signIn, signOut, currentUser } = useAuth();
    const handleSignIn = () => {
      signIn({ username: 'test', password: 'test' }, mockOnSuccess);
    };
    const handleSignOut = () => {
      signOut(mockOnSuccess);
    };

    return (
      <div>
        <div>{`Current User: ${currentUser?.name}`}</div>
        <button type="button" onClick={handleSignIn}>Sign In</button>
        <button type="button" onClick={handleSignOut}>Sign Out</button>
      </div>
    );
  };

  test('should execute sign in function and callback', async () => {
    render(<TestComponent />, { wrapper: AuthProvider });

    userEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    expect(await screen.findByText('Current User: User')).not.toBeNull();
    expect(mockOnSuccess).toHaveBeenCalledTimes(1);
  });

  test('should execute sign out function and callback', async () => {
    render(<TestComponent />, { wrapper: AuthProvider });

    userEvent.click(screen.getByRole('button', { name: 'Sign Out' }));

    expect(screen.getByText('Current User: undefined')).not.toBeNull();
    await waitFor(() => expect(mockOnSuccess).toHaveBeenCalledTimes(1));
  });

  describe('useAuth', () => {
    test('should error if not wrapped in AuthProvider', () => {
      // eslint-disable-next-line no-console
      console.error = jest.fn();
      expect(() => render(<TestComponent />))
        .toThrowError('useAuth must be used within a AuthProvider');
    });
  });
});
