import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

import ConfigForm from '../ConfigForm';
import LogTable from './LogTable';
import {
  getValuesByConfig,
  submit as submitConfig,
} from '../../state/updateConfigForm';
import Spacing from '../Spacing';

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.unit * 3}px;
  display: flex;
`;

const LogContainer = styled.div`
  flex: 1;
  padding-right: ${({ theme }) => theme.spacing.unit * 1.5}px;
`;

const FormContainer = styled.div`
  flex: 1;
  padding-left: ${({ theme }) => theme.spacing.unit * 1.5}px;
`;

const UpdateConfigForm = compose(
  connect(state => ({
    initialValues: getValuesByConfig(state.config),
  })),
  reduxForm({
    form: 'updateConfigForm',
  }),
)(ConfigForm);

const ConfigPage = ({ onSubmit: onSubmitForm }) => {
  const [typeFilter, setTypeFilter] = useState('');
  const [snackIsOpen, setSnackIsOpen] = useState(false);

  const onTypeFilterChange = useCallback(e => {
    setTypeFilter(e.target.value);
  });

  const onSubmit = useCallback(async () => {
    await onSubmitForm();
    setSnackIsOpen(true);
  }, [onSubmitForm]);

  const onCloseSnack = useCallback(() => {
    setSnackIsOpen(false);
  });

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={snackIsOpen}
        autoHideDuration={6000}
        onClose={onCloseSnack}
        message={`Configuration has been saved. Run "yarn pm2 restart all" to apply changes`}
      />
      <Wrapper>
        <LogContainer>
          <Card>
            <CardContent>
              <TextField
                value={typeFilter}
                onChange={onTypeFilterChange}
                label="Types"
                placeholder="Filter by types"
                fullWidth
              />
            </CardContent>
            <LogTable types={typeFilter ? typeFilter.split(',') : null} />
          </Card>
        </LogContainer>
        <FormContainer>
          <Card>
            <CardContent>
              <UpdateConfigForm />
              <Spacing marginTop={2}>
                <Button variant="contained" color="primary" onClick={onSubmit}>
                  Save
                </Button>
              </Spacing>
            </CardContent>
          </Card>
        </FormContainer>
      </Wrapper>
    </>
  );
};

export default connect(
  null,
  dispatch => ({
    onSubmit: () => {
      return dispatch(submitConfig());
    },
  }),
)(ConfigPage);
