import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';

import SelectField from '../SelectField';
import TextFieldField from '../TextFieldField';

const PumpConfigurationForm = () => {
  return (
    <>
      <Box mb={2}>
        <SelectField name="mode" label="Mode">
          <MenuItem value="automatic">Automatic</MenuItem>
          <MenuItem value="manual">Manual</MenuItem>
        </SelectField>
      </Box>
      <Box>
        <TextFieldField name="rpm" type="number" label="Manual RPM" />
      </Box>
    </>
  );
};

export default PumpConfigurationForm;
