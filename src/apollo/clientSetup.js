import fetch from 'cross-fetch';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://py89pcivba.execute-api.eu-central-1.amazonaws.com/dev/graphql',
    fetch,
  }),
  cache: new InMemoryCache(),
});

export default client;
