import React from 'react';
import Icon from '@material-ui/core/Icon';
import { useQuery } from 'react-apollo-hooks';
import get from 'lodash/get';
import isNumber from 'lodash/isNumber';

import ReactorComponent from '../ReactorComponent';
import PumpConfigurationModal from '../PumpConfigurationModal';
import useModal from '@/hooks/useModal';
import { GET_PUMP_WITH_LATEST_MEASUREMENT } from '@/graphql/queries';

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

const getStatus = status => {
  return status ? status : 'off';
};

const ApiPumpReactorComponent = ({ pump, ...props }) => {
  const { unitShortName: unit, title, subtitle } = pump;

  const { data } = useQuery(GET_PUMP_WITH_LATEST_MEASUREMENT, {
    pollInterval: 5000,
    variables: {
      type: pump.type,
      systemId: pump.systemId,
    },
  });

  const measurement = get(data, 'pump.measurements[0]') || {};
  const { rpm, status } = measurement;

  const { open, onClose, onToggle } = useModal();

  return (
    <>
      <PumpConfigurationModal open={open} onClose={onClose} />
      <ReactorComponent
        status={getStatus(status)}
        value={isNumber(rpm) ? renderValue({ value: rpm, unit }) : null}
        name={renderName({ title, subtitle })}
        onStatusClick={onToggle}
        label={<Icon>play_arrow</Icon>}
        {...props}
      />
    </>
  );
};

export default ApiPumpReactorComponent;
