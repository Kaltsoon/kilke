import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import { snakeCase } from 'lodash';

import Sensor from './Sensor';

const SystemView = new GraphQLObjectType({
  name: 'SystemView',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: ({ systemId, title }) => `${systemId}.${snakeCase(title)}`,
    },
    sensors: {
      type: GraphQLList(Sensor),
    },
    title: {
      type: GraphQLString,
    },
  }),
});

export default SystemView;
