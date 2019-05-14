import { useContext } from 'react';
import { useAsync } from 'react-async';

import { useRefresher } from '../useRefresher';
import ApiContext from '@/components/ApiContext';
import useSystemId from '../useSystemId';

export const useApiAsync = (asyncArgs = {}) => {
  const apiClient = useContext(ApiContext);
  const systemId = useSystemId();

  return useAsync({ apiClient, systemId, ...asyncArgs });
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
