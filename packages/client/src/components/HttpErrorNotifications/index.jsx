import { useEffect } from 'react';
import { useSnackbar } from 'notistack';

const createErrorInterceptor = fn => error => {
  fn(error);

  return Promise.reject(error);
};

export const HttpErrorNotifications = ({ httpClient }) => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(
    () => {
      const interceptorFn = createErrorInterceptor(() =>
        enqueueSnackbar(
          'A network request has failed. Check the internet connection',
        ),
      );
      const interceptor = httpClient.interceptors.response.use(
        null,
        interceptorFn,
      );

      return () => httpClient.interceptor.response.eject(interceptor);
    },
    [enqueueSnackbar, httpClient],
  );

  return null;
};

export default HttpErrorNotifications;
