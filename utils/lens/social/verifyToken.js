import { apolloClient } from './apollo-client-login';
import { gql } from '@apollo/client/core'

const VERIFY = `
  query($request: VerifyRequest!) {
    verify(request: $request)
  }
`

export function verify(){
    return new Promise(async (resolve, reject) => {
        try{
            const _token = localStorage.getItem("LensToken")
            console.log(_token)
            if(_token){
              const token =  JSON.parse(_token)
              const accessToken = token?.accessToken
              const response = await apolloClient.query({
                  query: gql(VERIFY),
                  variables: {
                    request: {
                       accessToken,
                    },
                  },
              })
                resolve(response)
            }else{
              resolve(null)
            }
        }catch(err){
            console.log(err)
            reject(err)
        }        
    })

}