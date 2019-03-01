import { useCallback } from 'react';
import { useMappedState } from 'redux-react-hook';
import get from 'lodash/get';

const mapStateToConfig = state => state.config;

export const useConfig = () => {
  return useMappedState(mapStateToConfig);
};

export const useSensorConfig = type => {
  const mapState = useCallback(
    state => {
      return get(state, ['config', 'sensors', type]) || null;
    },
    [type],
  );

  return useMappedState(mapState);
};

export const usePumpConfig = type => {
  const mapState = useCallback(
    state => {
      return get(state, ['config', 'pumps', type]) || null;
    },
    [type],
  );

  return useMappedState(mapState);
};

export default useConfig;
