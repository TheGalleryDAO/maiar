import axios from 'axios'
import jwt from 'jwt-decode'
import { refreshAuth } from '../utils/lens/social/refreshToken'
import { verify } from '../utils/lens/social/verifyToken'
async function isValidToken(){
    try{
            const validAccessToken = await verify()
            const valid = validAccessToken?.data?.verify
            if(!valid){
                const newToken = await refreshAuth() || ""
                console.log(newToken)

                localStorage.setItem('LensToken',JSON.stringify(newToken.refreshToken))
            }
            return true
    }catch(err){
        localStorage.setItem('LensToken',"")
        console.log(err);
        return false
    }


}

export {
    isValidToken
}