import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Route, Link } from 'react-router-dom';
import get from 'lodash/get';

import useSystem from '@/hooks/useSystem';
import useSystemId from '@/hooks/useSystemId';

const TabsContainer = ({ activeTab, isReactorPath, isConfigPath }) => {
  const { system } = useSystem();
  const systemId = useSystemId();

  const tabs = system ? system.systemViews : [];
  const hasReactor = system ? system.hasReactor : false;
  const activeTabIndex = activeTab ? tabs.map(({ id }) => id).indexOf(activeTab) : -1;

  let activeIndex = activeTabIndex >= 0
    ? activeTabIndex
    : 0;

  let children = tabs.map(({ id, title }) => (
    <Tab
      key={id}
      label={title}
      component={Link}
      to={`/${systemId}/tabs/${id}`}
    />
  ));

  if (hasReactor) {
    children = [
      ...children,
      <Tab
        key="reactor"
        label="Reactor"
        component={Link}
        to={`/${systemId}/reactor`}
      />,
    ];
  }

  children = [
    ...children,
    <Tab
      key="config"
      label="Configuration"
      component={Link}
      to={`/${systemId}/config`}
    />,
  ];

  if (isConfigPath) {
    activeIndex = children.length - 1;
  }

  if (hasReactor && isReactorPath) {
    activeIndex = children.length - 2;
  }

  return (
    <Tabs
      value={activeIndex}
      indicatorColor="primary"
      textColor="primary"
      children={children}
    />
  );
};

const MainNavigation = () => {
  return (
    <Route
      path="/:systemId/config"
      children={({ match: configMatch }) => (
        <Route
          path="/:systemId/reactor"
          children={({ match: reactorMatch }) => (
            <Route
              path="/:systemId/tabs/:tab"
              children={({ match: tabMatch }) => (
                <TabsContainer
                  isReactorPath={!!reactorMatch}
                  isConfigPath={!!configMatch}
                  activeTab={get(tabMatch, 'params.tab')}
                />
              )}
            />
          )}
        />
      )}
    />
  );
};

export default MainNavigation;
