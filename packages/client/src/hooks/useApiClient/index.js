import { useContext } from 'react';

import ApiContext from '@/components/ApiContext';

export const useApiClient = () => {
  return useContext(ApiContext);
};

export default useApiClient;
