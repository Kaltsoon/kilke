import { GraphQLEnumType } from 'graphql';

export const PumpStatus = new GraphQLEnumType({
  name: 'PumpStatus',
  values: {
    FAULT: { value: 'fault' },
    MANUAL: { value: 'manual' },
    AUTOMATIC: { value: 'automatic' },
    OFF: { value: 'off' },
  },
});

export default PumpStatus;
