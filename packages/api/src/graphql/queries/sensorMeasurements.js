import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} from 'graphql';

import { GraphQLDateTime } from 'graphql-iso-date';
import { isEmpty } from 'lodash';

import SensorMeasurement from '../types/SensorMeasurement';

export default {
  args: {
    systemId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    types: {
      type: new GraphQLList(GraphQLString),
    },
    limit: {
      type: GraphQLInt,
      defaultValue: 100,
    },
    offset: {
      type: GraphQLInt,
      defaultValue: 0,
    },
    to: {
      type: GraphQLDateTime,
    },
    from: {
      type: GraphQLDateTime,
    },
  },
  type: new GraphQLList(SensorMeasurement),
  resolve: async (
    source,
    { systemId, types, to: toParam, from, offset, limit },
    { models: { SensorMeasurement } },
  ) => {
    const to = toParam ? toParam : new Date();

    let query = SensorMeasurement.query()
      .select('*')
      .where('systemId', systemId)
      .andWhere('createdAt', '<', to);

    if (from) {
      query = query.andWhere('createdAt', '>', from);
    }

    if (!isEmpty(types)) {
      query = query.andWhere(qb => qb.whereIn('type', types));
    }

    return query
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .offset(offset);
  },
};
