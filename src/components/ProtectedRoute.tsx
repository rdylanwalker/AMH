import React, { PropsWithChildren } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

/** Protects data that requires an authenticated user */
function PrivateRoute({ children, ...rest }: PropsWithChildren<RouteProps>) {
  const { currentUser } = useAuth();
  return (
    <Route
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...rest}
      render={({ location }) => (currentUser ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      ))}
    />
  );
}

export default PrivateRoute;
