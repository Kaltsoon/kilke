import { useQuery } from '@apollo/react-hooks';

import useSystemId from '../useSystemId';
import { GET_SYSTEM } from '@/graphql/queries';

export const useSystem = ({ id, includeReactor = false } = {}) => {
  const systemId = useSystemId();
  const targetId = id || systemId;

  const { data, ...rest } = useQuery(GET_SYSTEM, {
    variables: { id: targetId, includeReactor },
  });

  return { system: data ? data.system : undefined, ...rest };
};

export default useSystem;
