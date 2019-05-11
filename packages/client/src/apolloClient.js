import { ApolloClient } from 'apollo-client';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export const createClient = ({ uri }) => {
  return new ApolloClient({
    link: new BatchHttpLink({ uri }),
    cache: new InMemoryCache(),
  });
};

export default createClient;
