import { createSelector } from 'reselect';

export const selectLatestByType = createSelector(
  state => state.calibrations.latestByType,
  state => state.calibrations.byId,
  (state, type) => type,
  (byType, byId, type) => {
    const id = byType[type] ? byType[type].data : null;

    if (!id) {
      return null;
    }

    return byId[id] || null;
  },
);
