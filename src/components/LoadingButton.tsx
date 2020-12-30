import React, { ReactElement } from 'react';
import {
  Button,
  ButtonProps,
  CircularProgress,
  CircularProgressProps,
  makeStyles,
  Theme,
} from '@material-ui/core';

interface StyleProps {
  /** Size of the CircularProgress */
  progressSize: CircularProgressProps['size'];
}

const DEFAULT_LOADING_PROGRESS_SIZE = 16;

const useStyles = makeStyles<Theme, StyleProps>(() => ({
  buttonProgress: ({ progressSize }) => {
    let size = DEFAULT_LOADING_PROGRESS_SIZE;
    if (progressSize) {
      size = typeof progressSize === 'number' ? progressSize : parseInt(progressSize, 10);
    }
    return ({
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -(size / 2),
      marginLeft: -(size / 2),
    });
  },
}));

interface LoadingButtonProps extends ButtonProps {
  /** Whether or not the button should be in a loading state */
  loading: boolean;
  /** Props to apply to the CircularProgress component */
  CircularProgressProps?: CircularProgressProps,
}

/** A button to indicate that an action is in progress */
function LoadingButton({
  loading,
  CircularProgressProps: circularProgressProps = {
    size: DEFAULT_LOADING_PROGRESS_SIZE,
  },
  ...props
}: LoadingButtonProps): ReactElement {
  const classes = useStyles({ progressSize: circularProgressProps.size });

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ position: 'relative' }}>
        <Button
          variant="contained"
          disabled={loading}
          {...props}
        />
        {loading && (
        <CircularProgress
          className={classes.buttonProgress}
          {...circularProgressProps}
        />
        )}
      </div>
    </div>
  );
}

export default LoadingButton;
