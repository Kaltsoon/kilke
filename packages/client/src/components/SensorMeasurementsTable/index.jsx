import React, { memo } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import formatDate from 'date-fns/format';
import isValidDate from 'date-fns/isValid';

const SensorMeasurementsTable = memo(({ measurements }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Type</TableCell>
        <TableCell>Date</TableCell>
        <TableCell>Time</TableCell>
        <TableCell>Value</TableCell>
        <TableCell>Raw value</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {measurements.map(({ id, type, createdAt, value, rawValue }) => (
        <TableRow key={id}>
          <TableCell>{type}</TableCell>
          <TableCell>
            {isValidDate(new Date(createdAt))
              ? formatDate(new Date(createdAt), 'dd.MM.yyyy')
              : null}
          </TableCell>
          <TableCell>
            {isValidDate(new Date(createdAt))
              ? formatDate(new Date(createdAt), 'HH:mm:ss')
              : null}
          </TableCell>
          <TableCell>{value}</TableCell>
          <TableCell>{rawValue}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
));

export default SensorMeasurementsTable;
