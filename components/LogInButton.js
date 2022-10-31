
import React,{useState} from 'react'
import {signIn} from 'next-auth/react'
import  SignInButton from './general/SignInButton' 
import {Alert} from 'antd'
import Router from 'next/router'
export default function LogInButton({onSuccess,onError}) {
      const [verificationError, setVerificationError] = useState(false)
      const [loading, setLoading] = useState(false)

      const handleLogin = async ({message, signature}) => {
        setLoading(true)
        try {
          const callbackUrl = "https://thegallerydao.vercel.app/profile";
          const response = await signIn('credentials', { message: JSON.stringify(message), redirect:false, callbackUrl:callbackUrl, signature:signature})
          console.log(response)
          if(response.status !== 200){
            setVerificationError(true)
          }else{
            setLoading(false)
            Router.push("/")
          }
        } catch (error) {
          console.log("ERROR: ")
          console.log(error)
        }
        setLoading(false)
      }
  
    
    return (
      <div>
        <SignInButton 
        error={verificationError} 
        parentCallback={handleLogin} 
        loading={loading}
        />
        {
          verificationError?(
            <div className="mt-3">
              <Alert showIcon type="error" message="Wallet not whitelisted" description="Sorry but your wallet is not whitelisted, if you think that this is an error please contact with the support team."/>
            </div>
          ):null
        }        
      </div>
    )
  }