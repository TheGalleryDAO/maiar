import React,{useEffect, useState} from 'react'
import { useAccount, useConnect, useSignMessage } from 'wagmi'
import { getCsrfToken } from 'next-auth/react'
import { SiweMessage } from 'siwe'
import {Button} from 'antd'

export default function SignInButton({parentCallback, loading=false, error=null}){
    const {connectors, connectAsync} = useConnect()
    const {signMessageAsync} = useSignMessage()
    const { isConnected, address } = useAccount()



    const init = async (e) => {
        e.preventDefault()
        let userAddress =  address
        if(!isConnected){
            const res = await connectAsync({connector:connectors[0]}).catch((err) => console.log(err));
            userAddress = res.account.data?.account
          }
          const csrfToken = await getCsrfToken().catch((err) => console.log(err));
          const message = new SiweMessage({
            domain: window.location.host,
            address: userAddress,
            statement: 'Sign in with Ethereum to the app.',
            uri: window.location.origin,
            version: '1', 
            chainId: '1',
            nonce: csrfToken
          });
          const  signature = await signMessageAsync({ message: message.prepareMessage() }).catch((err => console.log(err)));
          parentCallback({message,signature})
    }
    return(
        <div className='text-center'>
            <Button 
                block
                
                loading={loading} 
                disabled={error} 
                type="primary"
                onClick={init}
            >Sign In</Button>
            <p className="mt-3"> Sign a message with your wallet to verify that you are the owner</p>
        </div>
    )
}