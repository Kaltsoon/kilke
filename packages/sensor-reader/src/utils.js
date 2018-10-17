import Observable from 'any-observable';
import inject from 'reconnect-core';
import net from 'net';

const reconnectNet = inject((...args) => {
  return net.connect(...args);
});

const nop = () => {};

export const createTcpClientObservable = ({ host, port, options = {}, onError = nop }) => {
  const opts = {
     failAfter: Infinity,
    ...options,
  };

  return new Observable(observer => {
    const client = reconnectNet(opts, stream => {
      stream.on('data', data => {
        observer.next(data.toString());
      });
    })
      .on('error', onError)
      .connect(port, host);

    return () => {
      client.disconnect();
    };
  });
};
