import { apolloClient } from './apollo-client-login';
import { gql } from '@apollo/client'

const GET_CHALLENGE = `
  query($request: ChallengeRequest!) {
    challenge(request: $request) { text }
  }
`

export const generateChallenge = (address) => {
    return new Promise(async (resolve, reject) => {
        try{
            const result = await apolloClient.query({
                query: gql(GET_CHALLENGE),
                variables: {
                  request: {
                     address,
                  },
                },
              })
              resolve(result)
        }catch(err){
            console.trace(err)
            reject(err)
        }
    })

}