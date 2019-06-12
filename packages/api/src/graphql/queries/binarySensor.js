import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { get, isObject } from 'lodash';

import BinarySensor from '../types/BinarySensor';

export default {
  args: {
    systemId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    type: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  type: BinarySensor,
  resolve: async (source, { systemId, type }, { dataLoaders }) => {
    const system = await dataLoaders.systemLoader.load(systemId);

    if (!system) {
      return null;
    }

    const config = get(system, ['config', 'binarySensors', type]);

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
