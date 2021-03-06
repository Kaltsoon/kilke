import React, { useState, useCallback, useMemo } from 'react';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import { useSnackbar } from 'notistack';

import useSystem from '@/hooks/useSystem';
import CodeEditor from '../CodeEditor';
import updateSystem from '@/apiUtils/updateSystem';
import useApiAsync from '@/hooks/useApiAsync';

const updateConfig = ([config], { systemId, apiClient }) => {
  return updateSystem({ update: { config }, systemId, apiClient });
};

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
  const { enqueueSnackbar } = useSnackbar();
  const { system, refetch: refetchSystem } = useSystem();
  const { run: runUpdate } = useApiAsync({ deferFn: updateConfig });

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

        enqueueSnackbar('Configuration has been saved');
      } catch (e) {
        enqueueSnackbar('Could not save the configuration');
      }

      refetchSystem();
    },
    [enqueueSnackbar, runUpdate, refetchSystem],
  );

  return (
    <Box p={3}>
      <Card>
        {system ? (
          <UpdateConfigForm initialConfig={prettyConfig} onSubmit={onSubmit} />
        ) : null}
      </Card>
    </Box>
  );
};

export default ConfigPage;
