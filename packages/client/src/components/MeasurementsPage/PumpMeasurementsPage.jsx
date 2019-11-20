import React, { memo, useCallback } from 'react';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/get';
import CardContent from '@material-ui/core/CardContent';

import { GET_PUMP_MEASUREMENTS } from '@/graphql/queries';
import useSystemId from '@/hooks/useSystemId';
import useDebounceState from '@/hooks/useDebounceState';
import PumpMeasurementsTable from '../PumpMeasurementsTable';
import TextField from '../TextField';

const TableContent = memo(({ measurements }) => (
  <PumpMeasurementsTable measurements={measurements} />
));

const Table = ({ types = [], systemId }) => {
  const { data } = useQuery(GET_PUMP_MEASUREMENTS, {
    variables: { systemId, types: types || [], limit: 50 },
    pollInterval: 5000,
  });

  return <TableContent measurements={get(data, 'pumpMeasurements') || []} />;
};

const PumpMeasurementsPage = () => {
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

export default PumpMeasurementsPage;
