import React, { memo, useCallback } from 'react';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/get';
import CardContent from '@material-ui/core/CardContent';

import { GET_BINARY_SENSOR_MEASUREMENTS } from '@/graphql/queries';
import useSystemId from '@/hooks/useSystemId';
import useDebounceState from '@/hooks/useDebounceState';
import BinarySensorMeasurementsTable from '../BinarySensorMeasurementsTable';
import TextField from '../TextField';

const TableContent = memo(({ measurements }) => (
  <BinarySensorMeasurementsTable measurements={measurements} />
));

const Table = ({ types = [], systemId }) => {
  const { data } = useQuery(GET_BINARY_SENSOR_MEASUREMENTS, {
    variables: { systemId, types: types || [], limit: 50 },
    pollInterval: 5000,
  });

  return (
    <TableContent measurements={get(data, 'binarySensorMeasurements') || []} />
  );
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
