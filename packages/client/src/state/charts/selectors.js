import { createSelector } from 'reselect';

export const selectTypeData = createSelector(
  state => state.charts.types,
  (state, type) => type,
  (types, type) => types[type],
);

export const selectChartOptions = createSelector(
  selectTypeData,
  typeData => {
    return typeData
      ? { ...(typeData.config || {}), series: { name: 'Value', data: typeData.data || [] } }
      : {};
  },
);
