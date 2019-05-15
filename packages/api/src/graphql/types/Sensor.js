import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
} from 'graphql';

import { get } from 'lodash';

import SensorMeasurement from './SensorMeasurement';

const SensorCalibration = new GraphQLObjectType({
  name: 'SensorCalibration',
  fields: () => ({
    x1: {
      type: GraphQLFloat,
    },
    y1: {
      type: GraphQLFloat,
    },
    x2: {
      type: GraphQLFloat,
    },
    y2: {
      type: GraphQLFloat,
    },
  }),
});

const Sensor = new GraphQLObjectType({
  name: 'Sensor',
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
    unitFullName: {
      type: GraphQLString,
      resolve: ({ unit }) => get(unit, 'title'),
    },
    unitShortName: {
      type: GraphQLString,
      resolve: ({ unit }) => get(unit, 'unit'),
    },
    calibration: {
      type: SensorCalibration,
    },
    reactorTitle: {
      type: GraphQLString,
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
      type: GraphQLList(SensorMeasurement),
      resolve: ({ systemId, type }, { limit }, { models }) => {
        if (!systemId || !type) {
          return [];
        }

        return models.SensorMeasurement.query()
          .where({
            systemId,
            type,
          })
          .limit(limit)
          .orderBy('createdAt');
      },
    },
  }),
});

export default Sensor;
