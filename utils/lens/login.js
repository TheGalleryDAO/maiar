import { gql } from '@apollo/client/core';
import { apolloClient } from './apollo-client';
import { getAddressFromSigner, signText } from './ethers.service';
import localStorage from 'localStorage'

const GET_CHALLENGE = `
  query($request: ChallengeRequest!) {
    challenge(request: $request) { text }
  }
`;

export const generateChallenge = (address) => {
  return apolloClient.query({
    query: gql(GET_CHALLENGE),
    variables: {
      request: {
        address,
      },
    },
  });
};

const AUTHENTICATION = `
  mutation($request: SignedAuthChallenge!) { 
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
 }
`;

const authenticate = (address, signature) => {
  return apolloClient.mutate({
    mutation: gql(AUTHENTICATION),
    variables: {
      request: {
        address,
        signature,
      },
    },
  });
};

export const login = () => {
    return new Promise(async (resolve,reject) => {
        try{
            const address = getAddressFromSigner()
            if (localStorage.getItem("AuthenticationToken")) {
                resolve("User Already loged in");
              }
            
              console.log('login: address', address);
            
              // we request a challenge from the server
              const challengeResponse = await generateChallenge(address);
            
              // sign the text with the wallet
              const signature = await signText(challengeResponse.data.challenge.text);
            
              const accessTokens = await authenticate(address, signature);
              console.log('login: result');
              console.log(accessTokens.data)
            
              localStorage.setItem("AuthenticationToken",accessTokens.data.authenticate.accessToken);
            
              resolve(accessTokens.data);
        }catch(err){
            console.trace(err)
            reject("Login Error")
        }
    })


};
