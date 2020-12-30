import React, {
  createContext, PropsWithChildren, useCallback, useContext, useEffect, useRef, useState,
} from 'react';
import { CancelablePromise, CancelablePromiseType } from 'cancelable-promise';
import { LoginVars, User } from '../types';

type LoginFunction = (loginVars: LoginVars, onSuccess?: (args?: any[]) => void) => void;
type LogoutFunction = (onSuccess?: (args?: any[]) => void) => void;

export interface AuthContextState {
  currentUser: User | null;
  signIn: LoginFunction;
  signOut: LogoutFunction;
}

const AuthContext = createContext<AuthContextState | undefined>(undefined);

/**
 * Authentication provider for the application.  Provides current user information
 * and methods to sign in and out
 * */
function AuthProvider({ children }: PropsWithChildren<{}>) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const signInTimer = useRef<number>();
  const signOutTimer = useRef<number>();
  const loginPromise = useRef<CancelablePromiseType<void>>();

  const signIn: LoginFunction = useCallback(async (loginVars, onSuccess) => {
    loginPromise.current = new CancelablePromise<void>((resolve) => {
      signInTimer.current = window.setTimeout(() => {
        setCurrentUser({
          name: 'User',
        });
        onSuccess?.();
        resolve();
      }, 1000);
    });
    await loginPromise.current;
  }, []);

  const signOut: LogoutFunction = useCallback(async (onSuccess) => {
    signOutTimer.current = await window.setTimeout(() => {
      setCurrentUser(null);
      onSuccess?.();
    }, 500);
  }, []);

  useEffect(() => () => {
    window.clearTimeout(signInTimer.current);
    window.clearTimeout(signOutTimer.current);
    loginPromise.current?.cancel();
  }, []);

  return (
    <AuthContext.Provider value={{
      currentUser,
      signIn,
      signOut,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const authContext = useContext(AuthContext);
  if (authContext === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return authContext;
}

export default AuthProvider;
