import BaseModel from './baseModel';

class SensorMeasurement extends BaseModel {
  static get idColumn() {
    return 'id'
  }

  static get tableName() {
    return 'binary_sensor_measurements';
  }
}

export default SensorMeasurement;
