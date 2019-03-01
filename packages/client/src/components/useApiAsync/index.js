import { useContext } from 'react';
import { useAsync } from 'async';

import { useRefresher } from '../useRefresher';
import ApiContext from '../ApiContext';

export const useApiAsync = (asyncArgs = {}) => {
  const apiClient = useContext(ApiContext);

  return useAsync({ apiClient, ...asyncArgs });
};

export const usePollingApiAsync = ({
  pollInterval,
  watch: watchArg,
  ...asyncArgs
}) => {
  const token = useRefresher(pollInterval);

  const watch = watchArg ? [watchArg, token].join(',') : token;

  return useApiAsync({ ...asyncArgs, watch });
};

export default useApiAsync;
