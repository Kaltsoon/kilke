import React, { memo } from 'react';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import formatDate from 'date-fns/format';
import isValidDate from 'date-fns/is_valid';

import { usePollingApiAsync } from '@/hooks/useApiAsync';
import { getSensorMeasurementLog } from '@/apiUtils';

const LogTableWrapper = styled.div`
  max-height: 600px;
  overflow-y: auto;
`;

const LogTableContent = memo(({ measurements }) => (
  <LogTableWrapper>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Type</TableCell>
          <TableCell>Time</TableCell>
          <TableCell>Value</TableCell>
          <TableCell>Raw value</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {measurements.map(({ id, type, createdAt, value, rawValue }) => (
          <TableRow key={id}>
            <TableCell>{type || '-'}</TableCell>
            <TableCell>
              {isValidDate(new Date(createdAt))
                ? formatDate(new Date(createdAt), 'HH:mm:ss')
                : '-'}
            </TableCell>
            <TableCell>{value ? value : '-'}</TableCell>
            <TableCell>{rawValue ? rawValue : '-'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </LogTableWrapper>
));

const LogTable = ({ types = null }) => {
  const { data } = usePollingApiAsync({
    promiseFn: getSensorMeasurementLog,
    types,
    watch: JSON.stringify(types),
    pollInterval: 5000,
    limit: 50,
  });

  return <LogTableContent measurements={data || []} />;
};

export default LogTable;
