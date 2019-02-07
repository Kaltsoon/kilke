import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';

import ApiAsync from '../ApiAsync';
import ReactorComponent from '../ReactorComponent';
import { getLatestSensorMeasurement } from '../../apiUtils';
import Refresher from '../Refresher';

const getLatestSensorMeasurementPromiseFn = args =>
  getLatestSensorMeasurement(args);

const SensorAsync = ({ type, token, ...props }) => {
  const watch = JSON.stringify([type, token]);

  return (
    <ApiAsync
      promiseFn={getLatestSensorMeasurementPromiseFn}
      type={type}
      watch={watch}
      {...props}
    />
  );
};

const renderValue = ({ unit, value }) => {
  return unit ? `${value} ${unit}` : value;
};

const renderName = ({ title, subtitle }) => {
  return (
    <>
      {title}{subtitle ? <sub>{subtitle}</sub> : null}
    </>
  );
};

const ApiSensorReactorComponent = ({ type, unit, title, subtitle, label }) => (
  <Refresher interval={5000}>
    {({ token }) => (
      <SensorAsync type={type} token={token}>
        {({ data }) => (
          <ReactorComponent
            status="automatic"
            value={data ? renderValue({ value: data.value, unit }) : null}
            name={renderName({ title, subtitle })}
            label={label}
          />
        )}
      </SensorAsync>
    )}
  </Refresher>
);

export default connect(
  (state, { type }) => ({
    unit: get(state, ['config', 'sensors', type, 'unit', 'unit']) || '',
    title: get(state, ['config', 'sensors', type, 'title']),
    subtitle: get(state, ['config', 'sensors', type, 'subtitle']),
    label: get(state, ['config', 'sensors', type, 'reactorTitle']),
  }),
)(ApiSensorReactorComponent);
