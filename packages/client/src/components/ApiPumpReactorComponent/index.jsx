import React from 'react';
import Icon from '@material-ui/core/Icon';

import ReactorComponent from '../ReactorComponent';

import { getLatestPumpMeasurement } from '@/apiUtils';
import PumpConfigurationModal from '../PumpConfigurationModal';
import { usePollingApiAsync } from '@/hooks/useApiAsync';
import useModal from '@/hooks/useModal';

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

const getStatus = data => {
  return data ? data.status : 'off';
};

const ApiPumpReactorComponent = ({ pump, ...props }) => {
  const unit = pump ? pump.unitShortName : '';
  const title = pump ? pump.title : '';
  const subtitle = pump ? pump.subtitle : '';

  const { data } = usePollingApiAsync({
    promiseFn: getLatestPumpMeasurement,
    watch: pump.type,
    pollInterval: 5000,
    type: pump.type,
  });

  const { open, onClose, onToggle } = useModal();

  return (
    <>
      <PumpConfigurationModal open={open} onClose={onClose} />
      <ReactorComponent
        status={getStatus(data)}
        value={data ? renderValue({ value: data.rpm, unit }) : null}
        name={renderName({ title, subtitle })}
        onStatusClick={onToggle}
        label={<Icon>play_arrow</Icon>}
        {...props}
      />
    </>
  );
};

export default ApiPumpReactorComponent;
