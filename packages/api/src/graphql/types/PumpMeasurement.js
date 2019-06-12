import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLFloat,
  GraphQLString,
} from 'graphql';

import { GraphQLDateTime } from 'graphql-iso-date';

import PumpStatus from './PumpStatus';

const PumpMeasurement = new GraphQLObjectType({
  name: 'PumpMeasurement',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    rpm: {
      type: GraphQLFloat,
    },
    flowRate: {
      type: GraphQLFloat,
    },
    status: {
      type: PumpStatus,
    },
    createdAt: {
      type: GraphQLDateTime,
    },
    type: {
      type: GraphQLString,
    },
  }),
});

export default PumpMeasurement;
