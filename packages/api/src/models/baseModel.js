import { Model } from 'objection';

import { isDate } from '@/utils';

export class BaseModel extends Model {
  static get useLimitInFirst() {
    return true;
  }

  $beforeInsert() {
    if (!isDate(this.createdAt)) {
      this.createdAt = new Date().toISOString();
    }
  }

  $beforeUpdate() {
    if (!isDate(this.updatedAt)) {
      this.updatedAt = new Date().toISOString();
    }
  }
}

export default BaseModel;
