import React from 'react';
import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { Field } from 'redux-form';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const Item = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.unit * 2}px;
`;

const renderInputField = props => {
  const { input, meta, ...rest } = props;

  return <Input {...input} {...rest} />;
};

const renderSelectField = props => {
  const { input, meta, ...rest } = props;

  return <Select {...input} {...rest} />;
};

const renderStatusSelectField = props => {
  return renderSelectField({
    children: [
      <MenuItem value="off">Off</MenuItem>,
      <MenuItem value="automatic">Automatic</MenuItem>,
      <MenuItem value="manual">Manual</MenuItem>,
      <MenuItem value="fault">Fault</MenuItem>,
    ],
    ...props,
  });
};

const PumpConfigurationForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Item>
        <FormControl fullWidth>
          <InputLabel htmlFor="configurationStatus">Status</InputLabel>
          <Field
            name="status"
            component={renderStatusSelectField}
            props={{ id: 'configurationStatus' }}
          />
        </FormControl>
      </Item>
      <Item>
        <FormControl fullWidth>
          <InputLabel htmlFor="configurationManualRpm">Manual RPM</InputLabel>
          <Field
            name="manualRpm"
            component={renderInputField}
            props={{ id: 'configurationManualRpm', type: 'number' }}
          />
        </FormControl>
      </Item>
      <Item>
        <FormControl fullWidth>
          <InputLabel htmlFor="configurationMinRpm">Minimum RPM</InputLabel>
          <Field
            name="minRpm"
            component={renderInputField}
            props={{ id: 'configurationMinRpm', type: 'number' }}
          />
        </FormControl>
      </Item>
      <Item>
        <FormControl fullWidth>
          <InputLabel htmlFor="configurationMaxRpm">Maximum RPM</InputLabel>
          <Field
            name="maxRpm"
            component={renderInputField}
            props={{ id: 'configurationMaxRpm', type: 'number' }}
          />
        </FormControl>
      </Item>
    </form>
  );
};

export default PumpConfigurationForm;
