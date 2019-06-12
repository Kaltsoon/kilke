import React, { memo } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import formatDate from 'date-fns/format';
import isValidDate from 'date-fns/is_valid';

const PumpMeasurementsTable = memo(({ measurements }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Type</TableCell>
        <TableCell>Date</TableCell>
        <TableCell>Time</TableCell>
        <TableCell>RPM</TableCell>
        <TableCell>Status</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {measurements.map(({ id, type, createdAt, rpm, status }) => (
        <TableRow key={id}>
          <TableCell>{type}</TableCell>
          <TableCell>
            {isValidDate(new Date(createdAt))
              ? formatDate(new Date(createdAt), 'DD.MM.YYYY')
              : null}
          </TableCell>
          <TableCell>
            {isValidDate(new Date(createdAt))
              ? formatDate(new Date(createdAt), 'HH:mm:ss')
              : null}
          </TableCell>
          <TableCell>{rpm}</TableCell>
          <TableCell>{status}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
));

export default PumpMeasurementsTable;
