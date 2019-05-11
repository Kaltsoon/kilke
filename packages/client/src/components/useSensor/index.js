import { useMemo } from 'react';

import useSystem from '../useSystem';

const useSensor = ({ type, systemId }) => {
  const { system } = useSystem({ id: systemId });

  const sensor = useMemo(
    () => {
      return system
        ? system.sensors.find(({ type: sensorType }) => sensorType === type)
        : null;
    },
    [system, type],
  );

  return sensor;
};

export default useSensor;
