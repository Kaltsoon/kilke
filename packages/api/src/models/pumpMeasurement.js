import BaseModel from './baseModel';

class SensorMeasurement extends BaseModel {
  static get idColumn() {
    return 'id';
  }

  static get tableName() {
    return 'pump_measurements';
  }
}

export default SensorMeasurement;
