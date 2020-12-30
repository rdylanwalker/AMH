import { createMuiTheme, Theme, ThemeProvider } from '@material-ui/core';
import React, { PropsWithChildren } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AuthProvider from 'context/AuthProvider';

jest.mock('context/AuthProvider');

interface TestProvidersProps {
  theme?: Theme,
}

function TestProviders({
  children,
  theme = createMuiTheme(),
}: PropsWithChildren<TestProvidersProps>) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          {children}
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default TestProviders;
