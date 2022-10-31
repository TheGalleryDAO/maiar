import { apolloClient } from './apollo-client';
// this is showing you how you use it with react for example
// if your using node or something else you can import using
// @apollo/client/core!
import { gql } from '@apollo/client/core'

const REFRESH_AUTHENTICATION = `
  mutation($request: RefreshRequest!) { 
    refresh(request: $request) {
      accessToken
      refreshToken
    }
 }
`

export const refreshAuth = () => {
   return new Promise(async (resolve, reject) => {
    try{
      const token =  JSON.parse(localStorage.getItem("LensToken"))
      const refreshToken = token?.refreshToken
      if(refreshToken) {
        const response = await apolloClient.mutate({
          mutation: gql(REFRESH_AUTHENTICATION),
          variables: {
            request: {
              refreshToken,
            },
          },
        }) 
      resolve(response)
      }else{
        reject(null)
      }
    }catch(err){
      console.log(err)
      reject(err)
    }
   })

}