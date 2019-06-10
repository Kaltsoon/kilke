import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean,
  GraphQLString,
} from 'graphql';

import { get, isObject, isEmpty } from 'lodash';

import SystemView from './SystemView';
import Sensor from './Sensor';
import Reactor from './Reactor';

const emptyConfig = {
  sensors: {},
  pumps: {},
  reactor: {},
  visualization: {
    tabs: [],
  },
};

const System = new GraphQLObjectType({
  name: 'System',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    hasReactor: {
      type: GraphQLBoolean,
      resolve: ({ config }) => !isEmpty(get(config, 'reactor')),
    },
    sensors: {
      type: new GraphQLList(Sensor),
      resolve: ({ config, id }) =>
        Object.entries(get(config, 'sensors') || [])
          .filter(isObject)
          .map(([type, sensor]) => ({
            ...sensor,
            type,
            systemId: id,
          })),
    },
    systemViews: {
      type: GraphQLList(SystemView),
      resolve: ({ config, id }) => {
        if (!config) {
          return [];
        }

        const tabs = get(config, 'visualization.tabs') || [];
        const sensorConfig = get(config, 'sensors') || {};

        return tabs
          .map(({ sensors, ...tabs }) => {
            return {
              ...tabs,
              systemId: id,
              sensors: (sensors || [])
                .map(type =>
                  isObject(sensorConfig[type])
                    ? {
                        systemId: id,
                        type,
                        ...sensorConfig[type],
                      }
                    : null,
                )
                .filter(Boolean),
            };
          })
          .filter(({ title }) => Boolean(title));
      },
    },
    rawConfig: {
      type: GraphQLString,
      resolve: ({ config }) => {
        return isObject(config)
          ? JSON.stringify(config)
          : JSON.stringify(emptyConfig);
      },
    },
    reactor: {
      type: Reactor,
      resolve: ({ id, config }) => ({ systemId: id, config }),
    },
    name: {
      type: GraphQLString,
    },
  }),
});

export default System;
