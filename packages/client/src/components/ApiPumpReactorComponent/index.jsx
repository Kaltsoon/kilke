import React, { useCallback } from 'react';
import Icon from '@material-ui/core/Icon';
import { useQuery } from 'react-apollo-hooks';
import get from 'lodash/get';
import isNumber from 'lodash/isNumber';
import { useSnackbar } from 'notistack';

import ReactorComponent from '../ReactorComponent';
import PumpConfigurationModal from '../PumpConfigurationModal';
import useModal from '@/hooks/useModal';
import { GET_PUMP_WITH_LATEST_MEASUREMENT } from '@/graphql/queries';
import { PumpStatus, PumpMode } from '@/constants';
import useApiAsync from '@/hooks/useApiAsync';
import updatePump from '@/apiUtils/updatePump';
import isNumeric from '@/utils/isNumeric';

const renderValue = ({ unit, value }) => {
  return unit ? `${value} ${unit}` : value;
};

const renderName = ({ title, subtitle, mode }) => {
  return (
    <>
      {title} ({mode === PumpMode.AUTOMATIC ? 'A' : 'M'})
      {subtitle ? <sub>{subtitle}</sub> : null}
    </>
  );
};

const getColorByStatus = (status, rpm) => {
  if (status === PumpStatus.FAULT) {
    return 'danger';
  } else if (rpm === 0) {
    return null;
  } else {
    return 'success';
  }
};

const ApiPumpReactorComponent = ({ pump, ...props }) => {
  const { unitShortName: unit, title, subtitle, mode, status } = pump;
  const { enqueueSnackbar } = useSnackbar();

  const { data } = useQuery(GET_PUMP_WITH_LATEST_MEASUREMENT, {
    pollInterval: 5000,
    variables: {
      type: pump.type,
      systemId: pump.systemId,
    },
  });

  const updatePumpFn = useCallback(
    ([update], { apiClient }) => {
      return updatePump({
        systemId: pump.systemId,
        type: pump.type,
        update,
        apiClient,
      });
    },
    [pump],
  );

  const measurement = get(data, 'pump.measurements[0]') || {};
  const { rpm } = measurement;
  const { isOpen, close, toggle } = useModal();
  const { run: runUpdatePump } = useApiAsync({ deferFn: updatePumpFn });

  const onSubmitConfig = useCallback(
    async values => {
      const response = await runUpdatePump({
        ...(values.mode && { mode: values.mode }),
        ...(isNumeric(values.rpm) && { rpm: values.rpm }),
      });

      if (response instanceof Error) {
        enqueueSnackbar('Could not update the pump configuration');
      } else {
        enqueueSnackbar('The pump configuration has been updated');
        close();
      }
    },
    [close, enqueueSnackbar, runUpdatePump],
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
        name={renderName({ title, subtitle, mode })}
        onStatusClick={toggle}
        label={<Icon>play_arrow</Icon>}
        {...props}
      />
    </>
  );
};

export default ApiPumpReactorComponent;
