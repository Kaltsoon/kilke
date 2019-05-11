import { GraphQLID, GraphQLNonNull } from 'graphql';

import System from '../types/System';

export default {
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  type: System,
  resolve: (source, { id }, { dataLoaders }) =>
    dataLoaders.systemLoader.load(id),
};
