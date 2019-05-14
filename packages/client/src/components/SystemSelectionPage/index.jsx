import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { useQuery } from 'react-apollo-hooks';

import { GET_SYSTEMS } from '@/graphql/queries';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.unit * 2}px;
  box-sizing: border-box;
`;

const Container = styled.div`
  width: 100%;
  max-width: 600px;
`;

export const SystemSelectionPage = ({ history }) => {
  const [systemId, setSystemId] = useState('');

  const onSystemChange = useCallback(
    e => {
      setSystemId(e.target.value);
    },
    [setSystemId],
  );

  const onSelect = useCallback(
    () => {
      history.push(`/${systemId}/config`);
    },
    [history, systemId],
  );

  const { data } = useQuery(GET_SYSTEMS);
  const systems = data.systems ? data.systems : [];

  return (
    <Wrapper>
      <Container>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Select the system
            </Typography>
            <FormControl fullWidth>
              <InputLabel>System</InputLabel>
              <Select value={systemId} onChange={onSystemChange}>
                {systems.map(({ id, name }) => (
                  <MenuItem value={id} key={id}>
                    {name || 'Anonymous system'}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </CardContent>
          <CardActions>
            <Button color="primary" disabled={!systemId} onClick={onSelect}>
              Select
            </Button>
          </CardActions>
        </Card>
      </Container>
    </Wrapper>
  );
};

export default SystemSelectionPage;
