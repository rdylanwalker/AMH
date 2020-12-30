import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mocked } from 'ts-jest/utils';
import { useAuth } from 'context/AuthProvider';
import makeMockAuthState from 'context/__fixtures__/makeMockAuthState';
import TestProviders from 'testUtils/TestProviders';
import { act } from 'react-dom/test-utils';
import LoginPage from './LoginPage';

jest.mock('context/AuthProvider');

const mockedUseAuth = mocked(useAuth, true);

describe('LoginPage', () => {
  const mockAuthState = makeMockAuthState();

  beforeEach(() => {
    mockedUseAuth.mockReturnValue(mockAuthState);
  });

  test('should login successfully, disable the buttons, and redirect', async () => {
    const mockSignIn = jest.fn(async (loginValues, onSuccess) => { onSuccess?.(); });
    mockedUseAuth.mockReturnValue({
      ...mockAuthState,
      signIn: mockSignIn,
    });
    render(<LoginPage />, { wrapper: TestProviders });

    await waitFor(() => (
      expect(screen.getByRole('button', { name: 'Login' })).toBeDisabled()));

    await act(async () => {
      await userEvent.type(screen.getByLabelText(/username/i), 'u');
      await userEvent.type(screen.getByLabelText(/password/i), 'password');
    });

    await waitFor(() => (
      expect(screen.getByRole('button', { name: 'Login' })).not.toBeDisabled()));

    userEvent.click(screen.getByRole('button', { name: 'Login' }));

    await screen.findByRole('progressbar');

    expect(mockSignIn).toHaveBeenCalledTimes(1);
    expect(mockSignIn).toHaveBeenCalledWith({
      username: 'u',
      password: 'password',
    }, expect.any(Function));
  });

  test('should show username and password fields are required', async () => {
    render(<LoginPage />, { wrapper: TestProviders });

    await waitFor(() => (
      expect(screen.getByRole('button', { name: 'Login' })).toBeDisabled()));

    await act(async () => {
      await userEvent.type(screen.getByLabelText(/username/i), 'u');
      await userEvent.type(screen.getByLabelText(/password/i), 'password');
      await userEvent.clear(screen.getByLabelText(/username/i));
      await userEvent.clear(screen.getByLabelText(/password/i));
    });

    expect(await screen.findAllByText('This field is required.')).toHaveLength(2);
  });
});
