import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import Icon from '@material-ui/core/Icon';

import ApiAsync from '../ApiAsync';
import ReactorComponent from '../ReactorComponent';

import {
  getLatestSensorMeasurement,
  getPumpConfiguration,
} from '../../apiUtils';

import Refresher from '../Refresher';
import PumpConfigurationModal from '../PumpConfigurationModal';

const getLatestSensorMeasurementPromiseFn = args => {
  return Promise.all([
    getLatestSensorMeasurement(args),
    getPumpConfiguration(args),
  ]).then(([measurement, config]) => ({
    measurement,
    config,
  }));
};

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
      {title}
      {subtitle ? <sub>{subtitle}</sub> : null}
    </>
  );
};

const getStatus = ({ config }) => {
  return config ? config.status : 'off';
};

const ApiPumpReactorComponent = ({ type, unit, title, subtitle }) => (
  <Refresher interval={5000}>
    {({ token }) => (
      <SensorAsync type={type} token={token}>
        {({ data }) => (
          <PumpConfigurationModal type={type}>
            {({ onToggle }) => (
              <ReactorComponent
                status={getStatus({ config: data ? data.config : null })}
                value={
                  data && data.measurement
                    ? renderValue({ value: data.measurement.value, unit })
                    : null
                }
                name={renderName({ title, subtitle })}
                onStatusClick={onToggle}
                label={<Icon>play_arrow</Icon>}
              />
            )}
          </PumpConfigurationModal>
        )}
      </SensorAsync>
    )}
  </Refresher>
);

export default connect((state, { type }) => ({
  unit: get(state, ['config', 'pumps', type, 'unit', 'unit']) || '',
  title: get(state, ['config', 'pumps', type, 'title']),
  subtitle: get(state, ['config', 'pumps', type, 'subtitle']),
}))(ApiPumpReactorComponent);
