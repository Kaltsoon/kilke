import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';

const isNumeric = value => {
  if (isNumber(value)) {
    return true;
  }

  if (isString(value) && !isNaN(parseInt(value))) {
    return true;
  }

  return false;
};

export default isNumeric;
