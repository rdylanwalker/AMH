import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingButton from './LoadingButton';

describe('LoadingButton', () => {
  test('should show a button without progress bar', () => {
    render(<LoadingButton loading={false}>Test</LoadingButton>);

    expect(screen.getByRole('button', { name: 'Test' })).not.toBeDisabled();
    expect(screen.queryByRole('progressbar')).toBeNull();
  });

  test('should show a disabled button with progress bar', () => {
    render(<LoadingButton loading>Test</LoadingButton>);

    expect(screen.getByRole('button', { name: 'Test' })).toBeDisabled();
    expect(screen.getByRole('progressbar')).not.toBeNull();
  });

  test('should change progressbar size with string', () => {
    render(
      <LoadingButton
        loading
        CircularProgressProps={{ size: '14' }}
      >
        Test
      </LoadingButton>,
    );

    expect(screen.getByRole('button', { name: 'Test' })).toBeDisabled();
    expect(screen.getByRole('progressbar')).not.toBeNull();
  });

  test('should use default progressbar size', () => {
    render(
      <LoadingButton
        loading
        CircularProgressProps={{ color: 'secondary' }}
      >
        Test
      </LoadingButton>,
    );

    expect(screen.getByRole('button', { name: 'Test' })).toBeDisabled();
    expect(screen.getByRole('progressbar')).not.toBeNull();
  });
});
