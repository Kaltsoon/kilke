import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { Form, Formik } from 'formik';

import PumpConfigurationForm from '../PumpConfigurationForm';

export const PumpConfigurationModal = ({
  open,
  onClose,
  onSubmit = () => {},
}) => (
  <Dialog open={open} onClose={onClose} fullWidth>
    <Formik
      onSubmit={onSubmit}
      initialValues={{ status: '', manualRpm: '', mode: '' }}
    >
      {() => (
        <Form>
          <DialogTitle>Send pump configuration</DialogTitle>
          <DialogContent>
            <PumpConfigurationForm />
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="contained">
              Submit
            </Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  </Dialog>
);

export default PumpConfigurationModal;
