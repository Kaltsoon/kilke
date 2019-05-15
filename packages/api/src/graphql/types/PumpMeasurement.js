import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLFloat,
} from 'graphql';

import PumpStatus from './PumpStatus';

const PumpMeasurement = new GraphQLObjectType({
  name: 'PumpMeasurement',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    rpm: {
      type: GraphQLFloat,
    },
    flowRate: {
      type: GraphQLFloat,
    },
    status: {
      type: PumpStatus,
    },
  }),
});

export default PumpMeasurement;
