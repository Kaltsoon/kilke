import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLFloat,
} from 'graphql';

import { get } from 'lodash';

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
  }),
});

export default Sensor;
