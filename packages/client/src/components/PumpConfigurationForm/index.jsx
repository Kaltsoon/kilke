import React from 'react';
import { Field } from 'react-final-form';
import MenuItem from '@material-ui/core/MenuItem';

import { FormFieldInput, FormFieldSelect } from '../FormFields';
import Spacing from '../Spacing';

const PumpConfigurationForm = () => {
  return (
    <>
      <Spacing marginBottom={2}>
        <Field name="status" component={FormFieldSelect} inputLabel="Status">
          <MenuItem value="off">Off</MenuItem>
          <MenuItem value="automatic">Automatic</MenuItem>
          <MenuItem value="manual">Manual</MenuItem>
          <MenuItem value="fault">Fault</MenuItem>
        </Field>
      </Spacing>
      <Spacing>
        <Field
          name="manualRpm"
          component={FormFieldInput}
          inputLabel="Manual RPM"
        />
      </Spacing>
    </>
  );
};

export default PumpConfigurationForm;
