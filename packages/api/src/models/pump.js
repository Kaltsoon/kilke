import BaseModel from './baseModel';

class Pump extends BaseModel {
  static get idColumn() {
    return ['system_id', 'type'];
  }

  static get tableName() {
    return 'pumps';
  }
}

export default Pump;
