import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} from 'graphql';

import { get } from 'lodash';

import PumpMeasurement from './PumpMeasurement';

const Pump = new GraphQLObjectType({
  name: 'Pump',
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
    reactorTitle: {
      type: GraphQLString,
    },
    unitFullName: {
      type: GraphQLString,
      resolve: ({ unit }) => get(unit, 'title') || 'Revolutions per minute',
    },
    unitShortName: {
      type: GraphQLString,
      resolve: ({ unit }) => get(unit, 'unit') || 'RPM',
    },
    type: {
      type: GraphQLString,
    },
    measurements: {
      args: {
        limit: {
          type: GraphQLInt,
          defaultValue: 50,
        },
      },
      type: new GraphQLList(PumpMeasurement),
      resolve: ({ systemId, type }, { limit }, { models }) => {
        if (!systemId || !type) {
          return [];
        }

        return models.PumpMeasurement.query()
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

export default Pump;
