import React, { useState, useCallback, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';

const createErrorInterceptor = fn => error => {
  fn(error);

  return Promise.reject(error);
};

export const HttpErrorNotifications = ({ httpClient }) => {
  const [snackIsOpen, setSnackIsOpen] = useState(false);

  const onCloseSnack = useCallback(
    () => {
      setSnackIsOpen(false);
    },
    [setSnackIsOpen],
  );

  useEffect(
    () => {
      const interceptorFn = createErrorInterceptor(() => setSnackIsOpen(true));
      const interceptor = httpClient.interceptors.response.use(
        null,
        interceptorFn,
      );

      return () => httpClient.interceptor.response.eject(interceptor);
    },
    [setSnackIsOpen, httpClient],
  );

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={snackIsOpen}
      autoHideDuration={6000}
      onClose={onCloseSnack}
      message="A network request has failed. Check the logs"
    />
  );
};

export default HttpErrorNotifications;
