import React from 'react';
import get from 'lodash/get';

import ReactorComponent from '../ReactorComponent';
import { getLatestSensorMeasurement } from '../../apiUtils';
import { usePollingApiAsync } from '../useApiAsync';
import { useSensorConfig } from '../useConfig';

const getLatestSensorMeasurementPromiseFn = args =>
  getLatestSensorMeasurement(args);

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

const ApiSensorReactorComponent = ({ type }) => {
  const config = useSensorConfig(type);

  const unit = get(config, 'unit.unit') || '';
  const title = get(config, 'title') || '';
  const subtitle = get(config, 'subtitle') || '';
  const label = get(config, 'reactorTitle');

  const { data } = usePollingApiAsync({
    promiseFn: getLatestSensorMeasurementPromiseFn,
    watch: type,
    pollInterval: 5000,
    type,
  });

  return (
    <ReactorComponent
      status="automatic"
      value={data ? renderValue({ value: data.value, unit }) : null}
      name={renderName({ title, subtitle })}
      label={label}
    />
  );
};

export default ApiSensorReactorComponent;
