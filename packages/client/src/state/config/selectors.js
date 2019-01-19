import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import get from 'lodash/get';
import isObject from 'lodash/isObject';

import { createConfig } from '../../chart';

const defaultChartConfig = createConfig()
  .type('areaspline')
  .xAxisType('datetime')
  .xAxisTitle('Time')
  .yAxisTitle('Value');

export const selectTabsArray = createSelector(
  state => get(state, 'config.visualization.tabs'),
  state => get(state, 'config.visualization.tabOrder'),
  (tabs, tabOrder) => {
    if (!tabs || !tabOrder) {
      return [];
    }

    return tabOrder
      .map(key => (tabs[key] ? { ...tabs[key], key } : null))
      .filter(t => !!t);
  },
);

export const selectTabSensorsArray = createSelector(
  (state, tab) => tab,
  state => get(state, 'config.visualization.tabs'),
  state => get(state, 'config.sensors'),
  (tab, tabs, sensors) => {
    if (!tab || !tabs || !sensors || !isObject(tabs[tab])) {
      return [];
    }

    const { sensors: tabSensors = [] } = tabs[tab];

    return tabSensors
      .map(key => (sensors[key] ? { ...sensors[key], key } : null))
      .filter(s => !!s);
  },
);

export const selectSensorConfig = createSelector(
  (state, type) => type,
  state => get(state, 'config.sensors'),
  (type, sensors) => {
    if (!type || !isObject(sensors) || !isObject(sensors[type])) {
      return null;
    }

    return sensors[type];
  },
);

export const selectSensorChartConfig = createCachedSelector(
  selectSensorConfig,
  config => {
    if (!config) {
      return null;
    }
    let chartConfig = defaultChartConfig;

    if (get(config, 'unit.title')) {
      chartConfig = chartConfig.yAxisTitle(config.unit.title);
    }

    return chartConfig.toObject();
  },
)((state, type) => type);
