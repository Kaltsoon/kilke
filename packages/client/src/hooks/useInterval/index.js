import { useRef, useEffect } from 'react';

export const useInterval = (callback, delay) => {
  const callbackRef = useRef();

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(
    () => {
      const tick = () => {
        callbackRef.current();
      };

      if (delay !== null) {
        const id = setInterval(tick, delay);

        return () => clearInterval(id);
      }
    },
    [delay],
  );
};

export default useInterval;
