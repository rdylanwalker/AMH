import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from '@material-ui/core';
import { Brightness4, Brightness7 } from '@material-ui/icons';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import LoadingButton from '../../components/LoadingButton';

interface Props {
  /** Callback to change the theme */
  toggleTheme: VoidFunction;
}

/** Header toolbar for the application.  Provides application-level functionality */
function AppHeader({ toggleTheme }: Props) {
  const theme = useTheme();
  const { currentUser, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleLogout = () => {
    setLoading(true);
    signOut(() => {
      setLoading(false);
      history.push('/login');
    });
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box flexGrow={1} clone>
          <Typography variant="h6">Aloha, My Home</Typography>
        </Box>
        <Tooltip title={`Toggle ${theme.palette.type === 'dark' ? 'Light' : 'Dark'} Theme`}>
          <IconButton
            color="inherit"
            onClick={toggleTheme}
          >
            {theme.palette.type === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Tooltip>
        {currentUser && (
          <Box ml={2}>
            <LoadingButton
              onClick={handleLogout}
              loading={loading}
            >
              Logout
            </LoadingButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
