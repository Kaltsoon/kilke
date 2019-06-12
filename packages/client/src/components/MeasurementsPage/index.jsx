import React from 'react';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import Tab from '@material-ui/core/Tab';

import RouterTabs from '../RouterTabs';
import SensorMeasurementsPage from './SensorMeasurementsPage';
import PumpMeasurementsPage from './PumpMeasurementsPage';
import BinarySensorMeasurementsPage from './BinarySensorMeasurementsPage';

const MeasurementsPage = ({ match }) => {
  return (
    <Box p={3}>
      <Card>
        <RouterTabs indicatorColor="primary" textColor="primary">
          <Tab component={Link} to={`${match.path}/sensors`} label="Sensors" />
          <Tab component={Link} to={`${match.path}/pumps`} label="Pumps" />
          <Tab
            component={Link}
            to={`${match.path}/binary-sensors`}
            label="Binary sensors"
          />
        </RouterTabs>
        <Switch>
          <Route
            path={`${match.path}/sensors`}
            component={SensorMeasurementsPage}
          />
          <Route
            path={`${match.path}/binary-sensors`}
            component={BinarySensorMeasurementsPage}
          />
          <Route
            path={`${match.path}/pumps`}
            component={PumpMeasurementsPage}
          />
          <Redirect to={`${match.path}/sensors`} />
        </Switch>
      </Card>
    </Box>
  );
};

export default MeasurementsPage;
