import React, { PropsWithChildren } from 'react';
import makeMockAuthState from '../__fixtures__/makeMockAuthState';

function AuthProvider({ children }: PropsWithChildren<{}>) {
  return (
    <div>
      {children}
    </div>
  );
}

export const useAuth: jest.Mock = jest.fn().mockReturnValue(makeMockAuthState());

export default AuthProvider;
