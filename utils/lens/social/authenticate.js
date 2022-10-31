import { apolloClient } from './apollo-client-login';
import { gql } from '@apollo/client'

const AUTHENTICATION = `
  mutation($request: SignedAuthChallenge!) { 
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
 }
`

export const authenticate = (address, signature) => {
    return new Promise(async (resolve, reject) => {
        try{
            const data = await apolloClient.mutate({
                mutation: gql(AUTHENTICATION),
                variables: {
                  request: {
                    address,
                    signature,
                  },
                },
              })
              resolve(data)
        }catch(err){
            console.trace(err)
            reject(err)
        }
    })
}
