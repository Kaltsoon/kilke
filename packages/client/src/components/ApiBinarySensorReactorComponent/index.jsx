import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import get from 'lodash/get';
import isBoolean from 'lodash/isBoolean';

import ReactorComponent from '../ReactorComponent';

import { GET_BINARY_SENSOR_WITH_LATEST_MEASUREMENT } from '@/graphql/queries';

const renderValue = value => {
  if (!isBoolean(value)) {
    return '-';
  }

  return value ? 'On' : 'Off';
};

const renderName = ({ title, subtitle }) => {
  return (
    <>
      {title}
      {subtitle ? <sub>{subtitle}</sub> : null}
    </>
  );
};

const ApiSensorReactorComponent = ({ binarySensor, ...props }) => {
  const { title, subtitle, reactorTitle: label } = binarySensor;

  const { data } = useQuery(GET_BINARY_SENSOR_WITH_LATEST_MEASUREMENT, {
    pollInterval: 5000,
    variables: {
      type: binarySensor.type,
      systemId: binarySensor.systemId,
    },
  });

  const value = isBoolean(get(data, 'binarySensor.measurements[0].value'))
    ? data.binarySensor.measurements[0].value
    : null;

  return (
    <ReactorComponent
      statusColor={value ? 'success' : null}
      value={renderValue(value)}
      name={renderName({ title, subtitle })}
      label={label}
      {...props}
    />
  );
};

export default ApiSensorReactorComponent;
