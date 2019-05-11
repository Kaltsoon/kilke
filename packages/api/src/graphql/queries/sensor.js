import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { get, isObject } from 'lodash';

import Sensor from '../types/Sensor';

export default {
  args: {
    systemId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    type: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  type: Sensor,
  resolve: async (source, { systemId, type }, { dataLoaders }) => {
    const system = await dataLoaders.systemLoader.load(systemId);

    if (!system) {
      return null;
    }

    const config = get(system, ['config', 'sensors', type]);

    if (!isObject(config)) {
      return null;
    }

    return {
      ...config,
      type,
      systemId,
    };
  },
};
