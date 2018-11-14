import Observable from 'any-observable';
import inject from 'reconnect-core';
import net from 'net';

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

export const calibrate = async ({ db, value, type }) => {
  const calibration = await db('calibrations')
    .where({ type })
    .orderBy('created_at', 'desc')
    .first('x_1', 'y_1', 'x_2', 'y_2');

  if (!calibration) {
    throw new Error(`No calibration found for sensor type "${type}"`);
  }

  const { x_1: x1, y_1: y1, x_2: x2, y_2: y2 } = calibration;

  const k = (y1 - y2) / (x1 - x2);
  const b = (x1 * y2 - x2 * y1) / (x1 - x2);

  return k * value + b;
};
