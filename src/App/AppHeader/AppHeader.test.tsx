import React, { PropsWithChildren } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMuiTheme } from '@material-ui/core';
import { MemoryRouter, Route } from 'react-router-dom';
import { mocked } from 'ts-jest/utils';
import AuthProvider, { useAuth } from 'context/AuthProvider';
import makeMockAuthState from 'context/__fixtures__/makeMockAuthState';
import TestProviders from 'testUtils/TestProviders';
import AppHeader from './AppHeader';

jest.mock('context/AuthProvider');

const mockedUseAuth = mocked(useAuth, true);

describe('AppHeader', () => {
  const mockToggleTheme = jest.fn();

  const mockAuthState = makeMockAuthState();

  beforeEach(() => {
    mockedUseAuth.mockReturnValue(mockAuthState);
  });

  test('should show toggle dark theme', () => {
    render(<AppHeader toggleTheme={mockToggleTheme} />, { wrapper: TestProviders });

    expect(screen.getByTitle('Toggle Dark Theme')).not.toBeNull();
  });

  test('should show toggle light theme', () => {
    render(
      <AppHeader toggleTheme={mockToggleTheme} />,
      {
        wrapper: ({ children }: PropsWithChildren<{}>) => (
          <TestProviders theme={createMuiTheme({ palette: { type: 'dark' } })}>
            {children}
          </TestProviders>
        ),
      },
    );

    expect(screen.getByTitle('Toggle Light Theme')).not.toBeNull();
  });

  test('should logout and redirect to login page', async () => {
    mockedUseAuth.mockReturnValue({
      ...mockAuthState,
      signOut: jest.fn(async (onSuccess) => {
        onSuccess?.();
      }),
      currentUser: {
        name: 'user',
      },
    });
    render(
      <MemoryRouter initialEntries={['/']}>
        <Route path="/login" exact>
          Login
        </Route>
        <Route path="/" exact>
          <AppHeader toggleTheme={mockToggleTheme} />
        </Route>
      </MemoryRouter>,
      { wrapper: AuthProvider },
    );

    userEvent.click(screen.getByRole('button', { name: 'Logout' }));

    expect(await screen.findByText('Login')).not.toBeNull();
  });
});
