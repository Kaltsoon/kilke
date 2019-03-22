import get from 'lodash/get';

export const getValuesByConfig = config => {
  const sensors = Object.entries(config.sensors || {}).map(
    ([type, sensor]) => ({
      type,
      x1: get(sensor, 'calibration.x1') || 1,
      y1: get(sensor, 'calibration.y1') || 1,
      x2: get(sensor, 'calibration.x2') || 2,
      y2: get(sensor, 'calibration.y2') || 2,
    }),
  );

  return {
    sensors,
  };
};

export const getConfigByValues = values => {
  const sensors = (get(values, 'sensors') || []).reduce(
    (acc, { type, x1, y1, x2, y2 }) => {
      if (type) {
        acc[type] = {
          calibration: {
            x1: parseFloat(x1),
            y1: parseFloat(y1),
            x2: parseFloat(x2),
            y2: parseFloat(y2),
          },
        };
      }

      return acc;
    },
    {},
  );

  return {
    sensors,
  };
};
