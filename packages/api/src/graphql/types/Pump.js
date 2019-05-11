import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLEnumType,
} from 'graphql';

import { get } from 'lodash';

const PumpStatus = new GraphQLEnumType({
  name: 'PumpStatus',
  values: {
    FAULT: { value: 'fault' },
    MANUAL: { value: 'manual' },
    AUTOMATIC: { value: 'automatic' },
    OFF: { value: 'off' },
  },
});

const Pump = new GraphQLObjectType({
  name: 'Pump',
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
      resolve: ({ unit }) => get(unit, 'title') || 'Revolutions per minute',
    },
    unitShortName: {
      type: GraphQLString,
      resolve: ({ unit }) => get(unit, 'unit') || 'RPM',
    },
    type: {
      type: GraphQLString,
    },
    status: {
      type: PumpStatus,
      resolve: ({ status }) => status || 'off',
    },
  }),
});

export default Pump;
