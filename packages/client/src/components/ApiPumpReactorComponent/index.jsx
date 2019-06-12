import React, { useCallback } from 'react';
import Icon from '@material-ui/core/Icon';
import { useQuery } from 'react-apollo-hooks';
import get from 'lodash/get';
import isNumber from 'lodash/isNumber';

import ReactorComponent from '../ReactorComponent';
import PumpConfigurationModal from '../PumpConfigurationModal';
import useModal from '@/hooks/useModal';
import { GET_PUMP_WITH_LATEST_MEASUREMENT } from '@/graphql/queries';
import { PumpStatus } from '@/constants';

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

const getColorByStatus = status => {
  if (status === PumpStatus.MANUAL) {
    return 'primary';
  } else if (status === PumpStatus.AUTOMATIC) {
    return 'success';
  } else if (status === PumpStatus.FAULT) {
    return 'danger';
  }

  return null;
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
  const { isOpen, close, toggle } = useModal();

  const onSubmitConfig = useCallback(
    () => {
      close();
    },
    [close],
  );

  return (
    <>
      <PumpConfigurationModal
        open={isOpen}
        onClose={close}
        onSubmit={onSubmitConfig}
      />
      <ReactorComponent
        statusColor={getColorByStatus(status)}
        value={isNumber(rpm) ? renderValue({ value: rpm, unit }) : '-'}
        name={renderName({ title, subtitle })}
        onStatusClick={toggle}
        label={<Icon>play_arrow</Icon>}
        {...props}
      />
    </>
  );
};

export default ApiPumpReactorComponent;
