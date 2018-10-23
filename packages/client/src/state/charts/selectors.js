import { createSelector } from 'reselect';

export const selectTypeData = createSelector(
  state => state.charts.types,
  (state, type) => type,
  (types, type) => types[type],
);
