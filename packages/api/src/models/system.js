import BaseModel from './baseModel';

class System extends BaseModel {
  static get idColumn() {
    return 'id'
  }

  static get tableName() {
    return 'systems';
  }
}

export default System;
