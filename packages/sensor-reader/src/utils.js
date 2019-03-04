import { get } from 'lodash';

export const isCalibrated = ({ config, type }) => {
  return !!get(config, ['sensors', type, 'calibration']);
};

export const calibrate = ({ config, value, type }) => {
  const { x1 = 1, x2 = 2, y1 = 1, y2 = 2 } =
    get(config, ['sensors', type, 'calibration']) || {};

  const k = (y1 - y2) / (x1 - x2);
  const b = (x1 * y2 - x2 * y1) / (x1 - x2);

  return k * value + b;
};
