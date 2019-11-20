import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import { useQuery } from '@apollo/react-hooks';

import { GET_SYSTEMS } from '@/graphql/queries';
import { spacing } from '@/theme';
import Select from '../Select';

const Wrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing(3)};
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

  const systems = data && data.systems ? data.systems : [];

  return (
    <Wrapper>
      <Container>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Select the system
            </Typography>
            <Select label="System" value={systemId} onChange={onSystemChange}>
              {systems.map(({ id, name }) => (
                <MenuItem value={id} key={id}>
                  {name || 'Anonymous system'}
                </MenuItem>
              ))}
            </Select>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              disabled={!systemId}
              onClick={onSelect}
            >
              Select
            </Button>
          </CardActions>
        </Card>
      </Container>
    </Wrapper>
  );
};

export default SystemSelectionPage;
