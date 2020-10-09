import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './clientSetup';

const wrapRootElement = ({ element }) => <ApolloProvider client={client}>{element}</ApolloProvider>;

export default wrapRootElement;
