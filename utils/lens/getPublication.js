import { apolloClient } from './apollo-client';
// this is showing you how you use it with react for example
// if your using node or something else you can import using
// @apollo/client/core!
import { gql } from '@apollo/client/core'

const GET_PUBLICATION = `
query($request: PublicationQueryRequest!) {
    publication(request: $request) {
        __typename 
        ... on Post {
            id
    }
    }
}
`

export async function getPublication(txHash){
        const result = await apolloClient.query({
            query: gql(GET_PUBLICATION),
            variables: {
              request: {
                txHash
              }
            },
          }).catch((err) => {
              console.trace(err);
              return(null)
          })
          if(result?.data?.publication?.id){
              return(result?.data?.publication?.id)
          }else{
              return(null)
          }
}
