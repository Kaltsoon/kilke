import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
} from 'graphql';

const BinarySensor = new GraphQLObjectType({
  name: 'BinarySensor',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: ({ type, systemId }) => `${systemId}.${type}`,
    },
    title: {
      type: GraphQLString,
    },
    subtitle: {
      type: GraphQLString,
    },
    type: {
      type: GraphQLString,
    },
  }),
});

export default BinarySensor;
