import { getFormValues } from 'redux-form';

import { getConfigByValues } from './utils';
import { updateConfig } from '../../apiUtils';

const getUpdateConfigFormValues = getFormValues('updateConfigForm');

export const submit = () => async (dispatch, getState, { apiClient }) => {
  const values = getUpdateConfigFormValues(getState());

  await updateConfig({ apiClient, config: getConfigByValues(values) });
};
