import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLFloat,
} from 'graphql';

const SensorMeasurement = new GraphQLObjectType({
  name: 'SensorMeasurement',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    value: {
      type: GraphQLFloat,
    },
  }),
});

export default SensorMeasurement;
