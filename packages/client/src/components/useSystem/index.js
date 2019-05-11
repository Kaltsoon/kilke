import useSystemId from '../useSystemId';
import { useQuery } from 'react-apollo-hooks';

import { GET_SYSTEM } from '../../graphql/queries';

export const useSystem = ({ id, includeReactor = false } = {}) => {
  const systemId = useSystemId();
  const targetId = id || systemId;

  const { data, ...rest } = useQuery(GET_SYSTEM, {
    variables: { id: targetId, includeReactor },
  });

  return { system: data.system, ...rest };
};

export default useSystem;
