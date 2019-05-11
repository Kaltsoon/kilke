import React, { Fragment, useMemo } from 'react';

import ChartGrid, { ChartGridItem } from '../ChartGrid';
import ApiChartContainer from '../ApiChartContainer';
import useSystem from '../useSystem';

const getSensors = ({ system, tabKey }) => {
  if (!system) {
    return [];
  }

  const targetTab = system.systemViews.find(({ id }) => id === tabKey);

  return targetTab ? targetTab.sensors : [];
};

const TabPage = ({
  match: {
    params: { tab: tabKey },
  },
}) => {
  const { system } = useSystem();

  const sensors = useMemo(() => getSensors({ system, tabKey }), [
    system,
    tabKey,
  ]);

  return (
    <ChartGrid>
      {sensors.map(sensor => (
        <ChartGridItem key={sensor.id}>
          <ApiChartContainer
            title={
              <Fragment>
                {sensor.title}
                {sensor.subtitle ? <sub>{sensor.subtitle}</sub> : null}
              </Fragment>
            }
            sensor={sensor}
          />
        </ChartGridItem>
      ))}
    </ChartGrid>
  );
};

export default TabPage;
