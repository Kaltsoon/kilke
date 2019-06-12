import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from 'graphql';

import BinarySensorMeasurement from './BinarySensorMeasurement';

const BinarySensor = new GraphQLObjectType({
  name: 'BinarySensor',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: ({ type, systemId }) => `${systemId}.${type}`,
    },
    systemId: {
      type: GraphQLString,
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
    reactorTitle: {
      type: GraphQLString,
    },
    measurements: {
      args: {
        limit: {
          type: GraphQLInt,
          defaultValue: 50,
        },
      },
      type: new GraphQLList(BinarySensorMeasurement),
      resolve: ({ systemId, type }, { limit }, { models }) => {
        if (!systemId || !type) {
          return [];
        }

        return models.BinarySensorMeasurement.query()
          .where({
            systemId,
            type,
          })
          .limit(limit)
          .orderBy('createdAt', 'desc');
      },
    },
  }),
});

export default BinarySensor;
