import React from 'react';
import { compose } from 'recompose';

import apiRefetch from '../apiRefetch';
import ReactorComponent from '../ReactorComponent';
import ReactorComponentStatus from '../ReactorComponentStatus';
import PumpReactorComponentInfo from '../PumpReactorComponentInfo';
import PumpConfigurationModal from '../PumpConfigurationModal';

const ApiPumpReactorComponent = ({ pumpFetch, measurementFetch }) => {
  if (!pumpFetch.value) {
    return null;
  }

  const {
    value: { displayName, id, status },
  } = pumpFetch;

  const { value } = measurementFetch;
  const rpm = value && value[0] ? value[0].value : null;
  const pumpStatus = status || 'online';

  return (
    <PumpConfigurationModal id={id}>
      {({ onToggle }) => (
        <ReactorComponent
          onClick={onToggle}
          icon={<ReactorComponentStatus status={pumpStatus} variant="pump" />}
          style={{ cursor: 'pointer' }}
        >
          <PumpReactorComponentInfo
            name={displayName || id}
            rpm={rpm}
            status={pumpStatus}
          />
        </ReactorComponent>
      )}
    </PumpConfigurationModal>
  );
};

export default compose(
  apiRefetch(props => ({
    pumpFetch: {
      url: `/v1/pumps/${props.id}`,
      refreshInterval: 2000,
    },
    measurementFetch: {
      url: `/v1/sensors/tco/measurements?limit=1`,
      refreshInterval: 2000,
    },
  })),
)(ApiPumpReactorComponent);
