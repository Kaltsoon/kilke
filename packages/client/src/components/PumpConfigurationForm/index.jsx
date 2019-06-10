import React from 'react';
import { Field } from 'react-final-form';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';

import { FormFieldInput, FormFieldSelect } from '../FormFields';

const PumpConfigurationForm = () => {
  return (
    <>
      <Box mb={2}>
        <Field name="status" component={FormFieldSelect} inputLabel="Status">
          <MenuItem value="off">Off</MenuItem>
          <MenuItem value="automatic">Automatic</MenuItem>
          <MenuItem value="manual">Manual</MenuItem>
          <MenuItem value="fault">Fault</MenuItem>
        </Field>
      </Box>
      <Box>
        <Field
          name="manualRpm"
          component={FormFieldInput}
          inputLabel="Manual RPM"
        />
      </Box>
    </>
  );
};

export default PumpConfigurationForm;
