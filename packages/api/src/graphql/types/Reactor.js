import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
} from 'graphql';

import { get, isObject } from 'lodash';

import Sensor from './Sensor';
import Pump from './Pump';
import BinarySensor from './BinarySensor';

const Reactor = new GraphQLObjectType({
  name: 'Reactor',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: ({ systemId }) => `${systemId}.reactor`,
    },
    sensors: {
      type: new GraphQLList(Sensor),
      resolve: ({ config, systemId }) => {
        const reactorSensors = get(config, 'reactor.sensors') || [];

        return reactorSensors
          .map(sensor =>
            isObject(get(config, ['sensors', sensor]))
              ? {
                  ...config.sensors[sensor],
                  type: sensor,
                  systemId,
                }
              : null,
          )
          .filter(Boolean);
      },
    },
    pumps: {
      type: new GraphQLList(Pump),
      resolve: async ({ config, systemId }, args, { models: { Pump } }) => {
        const systemPumps = await Pump.query().where({ systemId });

        return (get(config, 'reactor.pumps') || []).map(type => ({
          ...(isObject(get(config, ['pumps', type])) && config.pumps[type]),
          type,
          systemId,
          ...(systemPumps.find(({ type: pumpType }) => pumpType === type) ||
            {}),
        }));
      },
    },
    binarySensors: {
      type: new GraphQLList(BinarySensor),
      resolve: ({ config, systemId }) => {
        const reactorSensors = get(config, 'reactor.binarySensors') || [];

        return reactorSensors
          .map(sensor =>
            isObject(get(config, ['binarySensors', sensor]))
              ? {
                  ...config.sensors[sensor],
                  type: sensor,
                  systemId,
                }
              : null,
          )
          .filter(Boolean);
      },
    },
  }),
});

export default Reactor;
