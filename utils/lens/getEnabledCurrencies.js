import { apolloClient } from './apollo-client';
// this is showing you how you use it with react for example
// if your using node or something else you can import using
// @apollo/client/core!
import { gql } from '@apollo/client'
import {login} from './login'

const ENABLED_CURRENCIES = `
  query {
    enabledModuleCurrencies {
      name
      symbol
      decimals
      address
    }
  }
`

export const enabledCurrencies = async () => {
    await login()
   return apolloClient.query({
    query: gql(ENABLED_CURRENCIES)
  })
}