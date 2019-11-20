import { useRef } from 'react';

import generateId from '../utils/generateId';

const useId = prefix => {
  const idRef = useRef();

  if (!idRef.current) {
    idRef.current = generateId(prefix);
  }

  return idRef.current;
};

export default useId;
