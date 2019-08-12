import { GraphQLEnumType } from 'graphql';

export const PumpStatus = new GraphQLEnumType({
  name: 'PumpStatus',
  values: {
    FAULT: { value: 'fault' },
    OK: { value: 'ok' },
  },
});

export default PumpStatus;
