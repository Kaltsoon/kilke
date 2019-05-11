import Pump from './pump';
import SensorMeasurement from './sensorMeasurement';
import System from './system';

export const bindModels = knex => {
  return {
    Pump: Pump.bindKnex(knex),
    SensorMeasurement: SensorMeasurement.bindKnex(knex),
    System: System.bindKnex(knex),
  };
};

export default bindModels;
