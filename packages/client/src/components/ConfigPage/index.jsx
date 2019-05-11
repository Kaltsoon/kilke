import React, { useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

import LogTable from './LogTable';
import Spacing from '../Spacing';
import useSystem from '../useSystem';
import CodeEditor from '../CodeEditor';
import { updateSystem } from '../../apiUtils';
import useApiAsync from '../useApiAsync';

const updateConfig = ([config], { systemId, apiClient }) => {
  return updateSystem({ update: { config }, systemId, apiClient });
};

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
    [config],
  );

  return (
    <>
      <CodeEditor value={config} onChange={setConfig} />
      <Spacing marginTop={2}>
        <Button
          variant="contained"
          color="primary"
          disabled={!isValidConfig}
          onClick={onSubmit}
        >
          Save
        </Button>
      </Spacing>
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
  const { system, refetch: refetchSystem } = useSystem();
  const { run: runUpdate } = useApiAsync({ deferFn: updateConfig });

  const onTypeFilterChange = useCallback(e => {
    setTypeFilter(e.target.value);
  });

  const prettyConfig = useMemo(
    () => {
      return system ? getPrettyConfig(system.rawConfig) : null;
    },
    [system],
  );

  const onSubmit = useCallback(
    async configUpdate => {
      await runUpdate(configUpdate);
      setSnackIsOpen(true);
      refetchSystem();
    },
    [setSnackIsOpen, runUpdate],
  );

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
        message={`Configuration has been saved`}
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
              {system ? (
                <UpdateConfigForm
                  initialConfig={prettyConfig}
                  onSubmit={onSubmit}
                />
              ) : null}
            </CardContent>
          </Card>
        </FormContainer>
      </Wrapper>
    </>
  );
};

export default ConfigPage;
