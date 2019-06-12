import React from 'react';
import Tab from '@material-ui/core/Tab';
import { Link, withRouter } from 'react-router-dom';

import RouterTabs from '../RouterTabs';
import useSystem from '@/hooks/useSystem';
import useSystemId from '@/hooks/useSystemId';

const SystemTabs = () => {
  const { system } = useSystem();
  const systemId = useSystemId();

  const tabs = system ? system.systemViews : [];
  const hasReactor = system ? system.hasReactor : false;

  const systemViewTabs = tabs.map(({ id, title }) => (
    <Tab
      key={id}
      component={Link}
      label={title}
      to={`/${systemId}/tabs/${id}`}
    />
  ));

  return (
    <RouterTabs indicatorColor="primary" textColor="primary">
      {systemViewTabs}
      {hasReactor && (
        <Tab label="Reactor" component={Link} to={`/${systemId}/reactor`} />
      )}
      <Tab
        label="Measurements"
        component={Link}
        to={`/${systemId}/measurements`}
      />
      <Tab label="Configuration" component={Link} to={`/${systemId}/config`} />
    </RouterTabs>
  );
};

export default withRouter(SystemTabs);
