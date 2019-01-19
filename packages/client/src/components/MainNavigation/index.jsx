import React from 'react';
import { connect } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Route, Link } from 'react-router-dom';
import get from 'lodash/get';

import { selectTabsArray } from '../../state/config';

const TabsContainerBase = ({ activeTab, isReactorPath, tabs, reactor }) => {
  let activeIndex = activeTab
    ? tabs.map(({ key }) => key).indexOf(activeTab)
    : null;

  let children = tabs.map(({ key, title }) => (
    <Tab key={key} label={title} component={Link} to={`/tabs/${key}`} />
  ));

  if (reactor) {
    children = [
      ...children,
      <Tab key="reactor" label="Reactor" component={Link} to="/reactor" />,
    ];
  }

  if (reactor && isReactorPath) {
    activeIndex = children.length - 1;
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

const TabsContainer = connect(state => ({
  tabs: selectTabsArray(state),
  reactor: get(state, 'config.reactor'),
}))(TabsContainerBase);

const MainNavigation = () => {
  return (
    <Route
      path="/reactor"
      children={({ match: reactorMatch }) => (
        <Route
          path="/tabs/:tab"
          children={({ match: tabMatch }) => (
            <TabsContainer isReactorPath={!!reactorMatch} activeTab={get(tabMatch, 'params.tab')} />
          )}
        />
      )}
    />
  );
};

export default MainNavigation;
