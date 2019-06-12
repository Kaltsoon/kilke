import React, { memo, useCallback } from 'react';
import { useQuery } from 'react-apollo-hooks';
import get from 'lodash/get';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';

import { GET_SENSOR_MEASUREMENTS } from '@/graphql/queries';
import useSystemId from '@/hooks/useSystemId';
import useDebounceState from '@/hooks/useDebounceState';
import SensorMeasurementsTable from '../SensorMeasurementsTable';

const TableContent = memo(({ measurements }) => (
  <SensorMeasurementsTable measurements={measurements} />
));

const Table = ({ types = [], systemId }) => {
  const { data } = useQuery(GET_SENSOR_MEASUREMENTS, {
    variables: { systemId, types: types || [], limit: 50 },
    pollInterval: 5000,
  });

  return <TableContent measurements={get(data, 'sensorMeasurements') || []} />;
};

const SensorMeasurementsPage = () => {
  const systemId = useSystemId();

  const [typeFilter, setTypeFilter, debounceTypeFilter] = useDebounceState(
    '',
    500,
  );

  const onTypeFilterChange = useCallback(
    e => {
      setTypeFilter(e.target.value);
    },
    [setTypeFilter],
  );

  return (
    <>
      <CardContent>
        <TextField
          value={typeFilter}
          onChange={onTypeFilterChange}
          label="Types"
          fullWidth
        />
      </CardContent>
      <Table
        types={debounceTypeFilter ? debounceTypeFilter.split(',') : []}
        systemId={systemId}
      />
    </>
  );
};

export default SensorMeasurementsPage;
