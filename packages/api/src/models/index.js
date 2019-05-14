import Pump from './pump';
import SensorMeasurement from './sensorMeasurement';
import System from './system';
import PumpMeasurement from './pumpMeasurement';
import BinarySensorMeasurement from './binarySensorMeasurement';

export const bindModels = knex => {
  return {
    Pump: Pump.bindKnex(knex),
    SensorMeasurement: SensorMeasurement.bindKnex(knex),
    System: System.bindKnex(knex),
    PumpMeasurement: PumpMeasurement.bindKnex(knex),
    BinarySensorMeasurement: BinarySensorMeasurement.bindKnex(knex),
  };
};

export default bindModels;
