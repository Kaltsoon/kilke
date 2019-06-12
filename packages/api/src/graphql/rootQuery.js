import { GraphQLObjectType } from 'graphql';

import system from './queries/system';
import systems from './queries/systems';
import sensor from './queries/sensor';
import pump from './queries/pump';
import sensorMeasurements from './queries/sensorMeasurements';
import binarySensorMeasurements from './queries/binarySensorMeasurements';
import pumpMeasurements from './queries/pumpMeasurements';
import binarySensor from './queries/binarySensor';

export default new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    system,
    systems,
    sensor,
    pump,
    sensorMeasurements,
    binarySensorMeasurements,
    pumpMeasurements,
    binarySensor,
  }),
});
