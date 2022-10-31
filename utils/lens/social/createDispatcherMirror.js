import { apolloClient } from './apollo-client';
import { gql } from '@apollo/client'

const ProfileDocument = `
mutation($request:CreateMirrorRequest!) {
  createMirrorViaDispatcher(request: $request) {
    ... on RelayerResult {
      txHash
      txId
    }
    ... on RelayError {
      reason
    }
  }
}

`
export const createDispatcherMirror = async (profileId, publicationId) => {
    return new Promise(async (resolve, reject) => {
        try{
            const result = await apolloClient.query({
                query: gql(ProfileDocument),
                variables: {
                    request:
                    {
                      profileId: profileId,
                      publicationId: publicationId,
                      referenceModule: {
                        followerOnlyReferenceModule: false
                      }
                    }
                },
              });
            
              console.log(result)
            
              resolve(result?.data?.createMirrorViaDispatcher)
        }catch(err){
            console.trace(err)
            reject(err)
        }

    })
};


