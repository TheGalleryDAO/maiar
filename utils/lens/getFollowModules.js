import { gql } from '@apollo/client/core';
import { apolloClient } from './apollo-client';
import { login } from './login';
import { getAddressFromSigner } from './ethers.service';

const GET_PROFILES = `
  query($request: ProfileQueryRequest!) {
    profiles(request: $request) {
        items {
        id
        isFollowedByMe
        ownedBy
        followModule {
            ... on FeeFollowModuleSettings {
            type
            }
            ... on ProfileFollowModuleSettings {
            type
            }
            ... on RevertFollowModuleSettings {
            type
            }
        }
        }
      }
    }
`;


export const getFollowModules = (handles) => {
  return new Promise(async (resolve, reject) => {
    try{
        const response = await apolloClient.query({
            query: gql(GET_PROFILES),
            variables: {
                request:{
                    handles
                }
            },
          });
          resolve(response)
    }catch(err){
     console.trace(err);
     reject(err)   
    }
  })
};

export const profiles = async () => {
  const address = getAddressFromSigner();
  console.log('profiles: address', address);

  await login(address);
  

  // only showing one example to query but you can see from request
  // above you can query many
  const profilesFromProfileIds = await getProfilesRequest({ ownedBy: address });


  return profilesFromProfileIds.data;
};

