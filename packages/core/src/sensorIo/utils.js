import Observable from 'any-observable';
import inject from 'reconnect-core';
import net from 'net';

const reconnectNet = inject((...args) => {
  return net.connect(...args);
});

const noop = () => {};

export const createTcpClientObservable = ({
  host,
  port,
  options = {},
  onError = noop,
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

const isValidMessage = data => {
  if (!data && typeof data === 'object') {
    return false;
  }

  const { type } = data;

  if (typeof type !== 'string') {
    return false;
  }

  return true;
};

export const makeOutputObservable = observable =>
  new Observable(observer => {
    const sub = observable.subscribe(value => {
      if (isValidMessage(value)) {
        observer.next(value);
      }
    });

    return () => sub.unsubscribe();
  });
