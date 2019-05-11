import React from 'react';

import ReactorComponent from '../ReactorComponent';
import { getLatestSensorMeasurement } from '../../apiUtils';
import { usePollingApiAsync } from '../useApiAsync';

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

const ApiSensorReactorComponent = ({ sensor }) => {
  const unit = sensor ? sensor.unitShortName : '';
  const title = sensor ? sensor.title : '';
  const subtitle = sensor ? sensor.subtitle : '';
  const label = sensor ? sensor.reactorTitle : '';

  const { data } = usePollingApiAsync({
    promiseFn: getLatestSensorMeasurementPromiseFn,
    watch: sensor.type,
    pollInterval: 5000,
    type: sensor.type,
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
