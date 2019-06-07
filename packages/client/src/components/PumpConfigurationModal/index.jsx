import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { Form } from 'react-final-form';

import PumpConfigurationForm from '../PumpConfigurationForm';

export const PumpConfigurationModal = ({
  open,
  onClose,
  onSubmit = () => {},
}) => (
  <Dialog open={open} onClose={onClose} fullWidth>
    <Form onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <>
          <DialogTitle>Send pump configuration</DialogTitle>
          <DialogContent>
            <PumpConfigurationForm />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button color="primary" variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </DialogActions>
        </>
      )}
    </Form>
  </Dialog>
);

export default PumpConfigurationModal;
