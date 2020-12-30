import React from 'react';
import { render, screen } from '@testing-library/react';
import AuthProvider, { useAuth } from 'context/AuthProvider';
import makeMockAuthState from 'context/__fixtures__/makeMockAuthState';
import { mocked } from 'ts-jest/utils';
import TestProviders from 'testUtils/TestProviders';

import { MemoryRouter, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

jest.mock('context/AuthProvider');

const mockedUseAuth = mocked(useAuth, true);

describe('ProtectedRoute', () => {
  const mockAuthState = makeMockAuthState();

  test('should show children if current user is available', () => {
    mockedUseAuth.mockReturnValue({
      ...mockAuthState,
      currentUser: { name: 'Test' },
    });
    render(
      <ProtectedRoute>
        <div>Child</div>
      </ProtectedRoute>,
      {
        wrapper: TestProviders,
      },
    );

    expect(screen.getByText('Child')).not.toBeNull();
  });

  test('should redirect if current user is not available', async () => {
    mockedUseAuth.mockReturnValue(mockAuthState);

    render(
      <MemoryRouter initialEntries={['/']}>
        <Route path="/login" exact>
          Login
        </Route>
        <ProtectedRoute path="/" exact>
          <div>Child</div>
        </ProtectedRoute>
      </MemoryRouter>,
      {
        wrapper: AuthProvider,
      },
    );

    expect(await screen.findByText('Login')).not.toBeNull();
  });
});
