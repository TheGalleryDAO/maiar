import {
    ApolloClient,
    ApolloLink,
    from,
    HttpLink,
    InMemoryCache,
  } from '@apollo/client/core';
  import { onError } from '@apollo/client/link/error';
  import fetch from 'cross-fetch';
  import { lensAPI } from '../../lensSmartContractInfo';

  const defaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  };
  
  const httpLink = new HttpLink({
    uri: lensAPI,
    fetch,
  });
  
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)  {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      }
  
      );
    }
  
  
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });
  
  // example how you can pass in the x-access-token into requests using `ApolloLink`
  const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("LensToken");
  
    // Use the setContext method to set the HTTP headers.
    operation.setContext({
      headers: {
        'x-access-token': token ? `Bearer ${token}` : '',
      },
    });
  
    // Call the next link in the middleware chain.
    return forward(operation);
  });
  
  export const apolloClient = new ApolloClient({
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
  });