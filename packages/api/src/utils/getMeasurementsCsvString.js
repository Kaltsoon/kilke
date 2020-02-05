import { pick, zipObject, sortBy } from 'lodash';
import formatDate from 'date-fns/format';

import arrayToCsvString from './arrayToCsvString';

const round = (value, decimal = 3) => {
  return parseFloat(value.toFixed(decimal));
};

const periodsToCommas = value => value.toString().replace(/\./g, ',');

const getMeasurements = ({
  measurements,
  getValue = ({ value }) => value,
  getCreatedAt = ({ createdAt }) => createdAt,
  getType = ({ type }) => type,
  roundValues = true,
  types = [],
}) => {
  const byTime = measurements.reduce((acc, curr) => {
    const createdAt = getCreatedAt(curr);
    const timeKey = createdAt ? (createdAt * 1000).toString() : '_';
    const typeKey = getType(curr) || '_';
    const value = getValue(curr);

    acc[timeKey] = acc[timeKey] || {};
    acc[timeKey][typeKey] = roundValues ? round(value) : value;

    return acc;
  }, {});

  return Object.keys(byTime)
    .filter(k => k !== '_')
    .map(k => {
      const entry = byTime[k];

      return {
        createdAt: parseInt(k),
        ...zipObject(types, new Array(types.length).fill(0)),
        ...pick(entry, types),
      };
    })
    .sort((a, b) => a.createdAt - b.createdAt);
};

const getMeasurementsCsvString = options => {
  const { types } = options;
  const data = getMeasurements(options);

  const content = data.map(({ createdAt, ...typeData }) => {
    return [
      formatDate(new Date(createdAt), 'dd/MM/yyyy'),
      formatDate(new Date(createdAt), 'HH:mm:ss'),
      ...sortBy(Object.entries(typeData), ([type]) => type).map(([, value]) =>
        periodsToCommas(value),
      ),
    ];
  });

  return arrayToCsvString([['date', 'time', ...types.sort()], ...content]);
};

export default getMeasurementsCsvString;
