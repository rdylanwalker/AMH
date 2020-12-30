import {
  createMuiTheme,
  CssBaseline,
  makeStyles,
  ThemeProvider,
  useMediaQuery,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import AuthProvider from '../context/AuthProvider';
import AppHeader from './AppHeader/AppHeader';
import LoginPage from './LoginPage/LoginPage';
import ProtectedRoute from '../components/ProtectedRoute';

const useStyles = makeStyles(() => ({
  container: {
    height: '100%',
    width: '100%',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
}));

/** Entry point for the application */
function App() {
  const classes = useStyles();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [darkTheme, setDarkTheme] = useState(
    localStorage.getItem('prototype_theme') === 'true' || prefersDarkMode,
  );

  const toggleTheme = (): void => {
    setDarkTheme((prev) => !prev);
  };

  const theme = React.useMemo(
    () => createMuiTheme({
      palette: {
        type: darkTheme ? 'dark' : 'light',
      },
    }),
    [darkTheme],
  );

  useEffect(() => {
    localStorage.setItem('prototype_theme', darkTheme.toString());
  }, [darkTheme]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <AuthProvider>
          <Router basename="/amh">
            <div className={classes.container}>
              <AppHeader
                toggleTheme={toggleTheme}
              />
              <Switch>
                <ProtectedRoute exact path="/">
                  <div>
                    Content Here
                  </div>
                </ProtectedRoute>
                <Route path="/login">
                  <LoginPage />
                </Route>
              </Switch>
            </div>
          </Router>
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
