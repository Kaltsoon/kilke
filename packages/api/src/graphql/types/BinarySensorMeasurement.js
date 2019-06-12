import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

import { GraphQLDateTime } from 'graphql-iso-date';

const BinarySensorMeasurement = new GraphQLObjectType({
  name: 'BinarySensorMeasurement',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    value: {
      type: GraphQLBoolean,
    },
    createdAt: {
      type: GraphQLDateTime,
    },
    type: {
      type: GraphQLString,
    },
  }),
});

export default BinarySensorMeasurement;
