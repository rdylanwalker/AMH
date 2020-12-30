import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  makeStyles,
  TextField,
} from '@material-ui/core';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import { LoginVars } from '../../types';
import LoadingButton from '../../components/LoadingButton';

const useStyles = makeStyles((theme) => ({
  loginContainerRoot: {
    display: 'flex',
    flexGrow: 1,
  },
  loginCardRoot: {
    alignSelf: 'center',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 8),
  },
  loginCardHeaderRoot: {
    textAlign: 'center',
  },
  loginCardContentRoot: {
    padding: 0,
  },
  loginCardActionsRoot: {
    justifyContent: 'space-between',
    padding: theme.spacing(2, 0),
  },
}));

interface LocationState {
  from: {
    pathname: string;
  };
}

/** Login page for the application */
function LoginPage() {
  const classes = useStyles();
  const { signIn } = useAuth();
  const history = useHistory();
  const location = useLocation<LocationState>();

  const {
    formState,
    errors,
    handleSubmit,
    control,
  } = useForm<LoginVars>({
    mode: 'all',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const handleLogin: SubmitHandler<LoginVars> = async (fieldValues) => {
    const { from } = location.state || { from: { pathname: '/' } };
    await signIn(
      fieldValues,
      () => {
        history.replace(from);
      },
    );
  };

  return (
    <Container
      maxWidth="xs"
      classes={{
        root: classes.loginContainerRoot,
      }}
    >
      <Card
        classes={{
          root: classes.loginCardRoot,
        }}
        elevation={8}
      >
        <CardHeader
          title="Sign in"
          classes={{
            root: classes.loginCardHeaderRoot,
          }}
        />
        <CardContent
          classes={{
            root: classes.loginCardContentRoot,
          }}
        >
          <form
            id="login-form"
            autoComplete="off"
            onSubmit={handleSubmit(handleLogin)}
          >
            <Controller
              control={control}
              name="username"
              rules={{
                required: 'This field is required.',
              }}
              render={(
                {
                  onChange, onBlur, value, name, ref,
                },
              ) => (
                <TextField
                  id="login-username"
                  required
                  fullWidth
                  variant="outlined"
                  label="Username"
                  margin="normal"
                  error={!!errors.username}
                  helperText={errors.username?.message || ' '}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  name={name}
                  inputRef={ref}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={{
                required: 'This field is required.',
              }}
              render={(
                {
                  onChange, onBlur, value, name, ref,
                },
              ) => (
                <TextField
                  id="login-password"
                  required
                  fullWidth
                  variant="outlined"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  margin="normal"
                  error={!!errors.password}
                  helperText={errors.password?.message || ' '}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  name={name}
                  inputRef={ref}
                />
              )}
            />
          </form>
        </CardContent>
        <CardActions
          classes={{
            root: classes.loginCardActionsRoot,
          }}
        >
          <Button
            disabled={formState.isSubmitting}
            variant="outlined"
          >
            Register
          </Button>
          <LoadingButton
            type="submit"
            disabled={!formState.isValid || formState.isSubmitting}
            loading={formState.isSubmitting}
            variant="contained"
            form="login-form"
          >
            Login
          </LoadingButton>
        </CardActions>
      </Card>
    </Container>
  );
}

export default LoginPage;
