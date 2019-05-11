import React from 'react';
import Icon from '@material-ui/core/Icon';

import ReactorComponent from '../ReactorComponent';

import {
  getLatestSensorMeasurement,
  getPumpConfiguration,
} from '../../apiUtils';

import PumpConfigurationModal from '../PumpConfigurationModal';
import { usePollingApiAsync } from '../useApiAsync';

const getLatestSensorMeasurementPromiseFn = args => {
  return Promise.all([
    getLatestSensorMeasurement(args),
    getPumpConfiguration(args),
  ]).then(([measurement, config]) => ({
    measurement,
    config,
  }));
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

const ApiPumpReactorComponent = ({ pump }) => {
  const unit = pump ? pump.unitShortName : '';
  const title = pump ? pump.title : '';
  const subtitle = pump ? pump.subtitle : '';

  const { data } = usePollingApiAsync({
    promiseFn: getLatestSensorMeasurementPromiseFn,
    watch: pump.type,
    pollInterval: 5000,
    type: pump.type,
  });

  return (
    <PumpConfigurationModal type={pump.type}>
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
  );
};

export default ApiPumpReactorComponent;
