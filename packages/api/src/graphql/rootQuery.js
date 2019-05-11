import { GraphQLObjectType } from 'graphql';

import system from './queries/system';
import systems from './queries/systems';
import sensor from './queries/sensor';
import pump from './queries/pump';

export default new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    system,
    systems,
    sensor,
    pump,
  }),
});
