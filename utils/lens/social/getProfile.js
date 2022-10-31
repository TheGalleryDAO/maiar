import { apolloClient } from './apollo-client';
import { gql } from '@apollo/client'

const ProfileDocument = `
query($request:SingleProfileQueryRequest!){
    profile(request:$request) {
      dispatcher { 
        address
        canUseRelay
      }
    }
  }
`
export const getProfileRequest = async (profileId) => {
    return new Promise(async (resolve, reject) => {
        try{
            const result = await apolloClient.query({
                query: gql(ProfileDocument),
                variables: {
                    request:{profileId},
                },
              });
            
              resolve(result.data.profile)
        }catch(err){
            console.trace(err)
            reject(err)
        }

    })
};


