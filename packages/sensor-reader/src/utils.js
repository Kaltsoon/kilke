import Observable from 'any-observable';
import inject from 'reconnect-core';
import net from 'net';
import { get } from 'lodash';

const reconnectNet = inject((...args) => {
  return net.connect(...args);
});

const nop = () => {};

export const createTcpClientObservable = ({
  host,
  port,
  options = {},
  onError = nop,
}) => {
  const opts = {
    failAfter: Infinity,
    ...options,
  };

  return new Observable(observer => {
    const client = reconnectNet(opts, stream => {
      stream.on('data', data => {
        try {
          observer.next(JSON.parse(data.toString()));
        } catch (e) {
          onError(e);
        }
      });
    })
      .on('error', onError)
      .connect(
        port,
        host,
      );

    return () => {
      client.disconnect();
    };
  });
};

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
