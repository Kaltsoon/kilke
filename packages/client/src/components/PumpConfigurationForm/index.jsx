import React from 'react';
import { Field } from 'formik';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';

import { FormFieldInput, FormFieldSelect } from '../FormFields';

const PumpConfigurationForm = () => {
  return (
    <>
      <Box mb={2}>
        <Field name="mode" component={FormFieldSelect} inputLabel="Mode">
          <MenuItem value="automatic">Automatic</MenuItem>
          <MenuItem value="manual">Manual</MenuItem>
        </Field>
      </Box>
      <Box>
        <Field name="rpm" component={FormFieldInput} type="number" inputLabel="Manual RPM" />
      </Box>
    </>
  );
};

export default PumpConfigurationForm;
