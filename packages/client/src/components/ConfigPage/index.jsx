import React, { useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Snackbar from '@material-ui/core/Snackbar';

import LogTable from './LogTable';
import useSystem from '@/hooks/useSystem';
import CodeEditor from '../CodeEditor';
import updateSystem from '@/apiUtils/updateSystem';
import useApiAsync from '@/hooks/useApiAsync';
import { spacing } from '@/theme';

const updateConfig = ([config], { systemId, apiClient }) => {
  return updateSystem({ update: { config }, systemId, apiClient });
};

const Wrapper = styled.div`
  padding: ${spacing(3)}
  display: flex;
`;

const LogContainer = styled.div`
  flex: 1;
  padding-right: ${spacing(1.5)};
`;

const FormContainer = styled.div`
  flex: 1;
  padding-left: ${spacing(1.5)};
`;

const UpdateConfigForm = ({ initialConfig, onSubmit: onSubmitProp }) => {
  const [config, setConfig] = useState(initialConfig);

  const isValidConfig = useMemo(
    () => {
      try {
        JSON.parse(config);
        return true;
      } catch (e) {
        return false;
      }
    },
    [config],
  );

  const onSubmit = useCallback(
    () => {
      onSubmitProp(JSON.parse(config));
    },
    [config], // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <>
      <CardContent>
        <CodeEditor value={config} onChange={setConfig} />
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          disabled={!isValidConfig}
          onClick={onSubmit}
        >
          Save
        </Button>
      </CardActions>
    </>
  );
};

const getPrettyConfig = rawConfig => {
  try {
    return JSON.stringify(JSON.parse(rawConfig), null, 2);
  } catch (e) {
    return '{}';
  }
};

const ConfigPage = () => {
  const [typeFilter, setTypeFilter] = useState('');
  const [snackIsOpen, setSnackIsOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const { system, refetch: refetchSystem } = useSystem();
  const { run: runUpdate } = useApiAsync({ deferFn: updateConfig });

  const onTypeFilterChange = useCallback(
    e => {
      setTypeFilter(e.target.value);
    },
    [setTypeFilter],
  );

  const prettyConfig = useMemo(
    () => {
      return system ? getPrettyConfig(system.rawConfig) : null;
    },
    [system],
  );

  const onSubmit = useCallback(
    async configUpdate => {
      try {
        const response = await runUpdate(configUpdate);

        if (response instanceof Error) {
          throw response;
        }

        setSnackMessage('Configuration has been saved');
      } catch (e) {
        setSnackMessage('Could not save the configuration. Check the logs');
      }

      setSnackIsOpen(true);
      refetchSystem();
    },
    [setSnackIsOpen, runUpdate, refetchSystem],
  );

  const onCloseSnack = useCallback(
    () => {
      setSnackIsOpen(false);
    },
    [setSnackIsOpen],
  );

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
        message={snackMessage}
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
            {system ? (
              <UpdateConfigForm
                initialConfig={prettyConfig}
                onSubmit={onSubmit}
              />
            ) : null}
          </Card>
        </FormContainer>
      </Wrapper>
    </>
  );
};

export default ConfigPage;
