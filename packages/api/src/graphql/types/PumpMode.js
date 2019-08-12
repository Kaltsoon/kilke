import { GraphQLEnumType } from 'graphql';

export const PumpMode = new GraphQLEnumType({
  name: 'PumpMode',
  values: {
    AUTOMATIC: { value: 'automatic' },
    MANUAL: { value: 'manual' },
  },
});

export default PumpMode;
