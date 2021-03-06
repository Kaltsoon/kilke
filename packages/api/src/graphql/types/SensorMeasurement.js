import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLFloat,
  GraphQLString,
} from 'graphql';

import { GraphQLDateTime } from 'graphql-iso-date';

const SensorMeasurement = new GraphQLObjectType({
  name: 'SensorMeasurement',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    value: {
      type: GraphQLFloat,
    },
    rawValue: {
      type: GraphQLFloat,
    },
    createdAt: {
      type: GraphQLDateTime,
    },
    type: {
      type: GraphQLString,
    },
  }),
});

export default SensorMeasurement;
