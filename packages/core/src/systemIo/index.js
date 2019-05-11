import socketClusterClient from 'socketcluster-client';
import Observable from 'any-observable';

export class SystemInput {
  constructor({ client }) {
    this.client = client;
  }

  sendMessage({ systemId, payload }) {
    if (!systemId) {
      throw new Error('systemId is required');
    }

    this.client
      .getClient()
      .publish(`input.${systemId}`, JSON.stringify(payload));
  }
}

export class SystemOutput {
  constructor({ client }) {
    this.client = client;
  }

  observable() {
    return new Observable(observer => {
      this.client
        .getClient()
        .subscribe('output')
        .watch(message => {
          try {
            observer.next(JSON.parse(message));
          } catch (e) {} // eslint-disable-line no-empty
        });

      return () => this.client.getClient().unsubscribe('output');
    });
  }
}

export class SystemClient {
  constructor({ host, port, onConnect = () => {}, onError = () => {} }) {
    this.client = socketClusterClient.create({
      hostname: host,
      port,
    });

    this.client.on('connect', onConnect);
    this.client.on('error', onError);
  }

  getClient() {
    return this.client;
  }
}
