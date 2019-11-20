import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/get';
import isNumber from 'lodash/isNumber';

import ReactorComponent from '../ReactorComponent';

import { GET_SENSOR_WITH_LATEST_MEASUREMENT } from '@/graphql/queries';

const renderValue = ({ unit, value }) => {
  return unit ? `${value} ${unit}` : value;
};

const renderName = ({ title, subtitle }) => {
  return (
    <>
      {title}
      {subtitle ? <sub>{subtitle}</sub> : null}
    </>
  );
};

const ApiSensorReactorComponent = ({ sensor, ...props }) => {
  const { unitShortName: unit, title, subtitle, reactorTitle: label } = sensor;

  const { data } = useQuery(GET_SENSOR_WITH_LATEST_MEASUREMENT, {
    pollInterval: 5000,
    variables: {
      type: sensor.type,
      systemId: sensor.systemId,
    },
  });

  const value = isNumber(get(data, 'sensor.measurements[0].value'))
    ? data.sensor.measurements[0].value
    : null;

  return (
    <ReactorComponent
      statusColor="primary"
      value={isNumber(value) ? renderValue({ value, unit }) : '-'}
      name={renderName({ title, subtitle })}
      label={label}
      {...props}
    />
  );
};

export default ApiSensorReactorComponent;
