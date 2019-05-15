import { GraphQLList } from 'graphql';

import System from '../types/System';

export default {
  args: {},
  type: new GraphQLList(System),
  resolve: (source, args, { models: { System } }) => {
    return System.query();
  },
};
