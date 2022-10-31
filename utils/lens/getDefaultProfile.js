import { apolloClient } from './apollo-client';
// this is showing you how you use it with react for example
// if your using node or something else you can import using
// @apollo/client/core!
import { gql } from '@apollo/client'

const GET_PROFILES = `
query ($request: ProfileQueryRequest!) {
  profiles(request: $request) {
    items {
      id
      handle
      dispatcher {
        address
        canUseRelay
      }
    }
  }
}
`;

export default function getDefaultProfile(ethereumAddress){
   return new Promise(async (resolve, reject) => {
       try{
        const data = await apolloClient.query({
            query: gql(GET_PROFILES),
            variables: {
              request: {
                ownedBy: [ethereumAddress]            
              }
            },
          });   
          resolve(data?.data?.profiles?.items[0])
       }catch(err){
           //console.trace(err);
           resolve(null)
       }
   })
}