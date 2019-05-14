import { useState } from 'react';

import { useInterval } from '../useInterval';

const createToken = () => Date.now();

export const useRefresher = delay => {
  const [token, setToken] = useState(0);

  useInterval(() => {
    setToken(createToken());
  }, delay);

  return token;
};

export default useRefresher;
