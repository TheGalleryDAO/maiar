import { apolloClient } from './apollo-client';
import { gql } from '@apollo/client'

const ProfileDocument = `
mutation($request:CreatePublicPostRequest!) {
  createPostViaDispatcher(request: $request) {
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
export const createDispatcherPost = async (profileId, ipfsHash) => {
    return new Promise(async (resolve, reject) => {
        try{
            const result = await apolloClient.query({
                query: gql(ProfileDocument),
                variables: {
                    request:
                      {
                        profileId: profileId,
                        contentURI: `ipfs://${ipfsHash}`,
                        collectModule: { freeCollectModule: { followerOnly: false } },
                        referenceModule: { followerOnlyReferenceModule: false },
                      }
                },
              });
            
              resolve(result?.data?.createPostViaDispatcher)
        }catch(err){
            console.trace(err)
            reject(err)
        }

    })
};


