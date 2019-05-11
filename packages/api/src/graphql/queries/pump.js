import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { get } from 'lodash';

import Pump from '../types/Pump';

export default {
  args: {
    systemId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    type: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  type: Pump,
  resolve: async (source, { systemId, type }, { dataLoaders }) => {
    const [system, pump] = await Promise.all([
      dataLoaders.systemLoader.load(systemId),
      dataLoaders.pumpLoader.load([systemId, type]),
    ]);

    const config = get(system, ['config', 'pumps', type]);

    if (!config && !pump) {
      return null;
    }

    return {
      ...(config || {}),
      systemId,
      type,
      ...(pump || {}),
    };
  },
};
