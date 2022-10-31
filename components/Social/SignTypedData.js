import React,{useRef} from 'react'
import {  useSignTypedData } from 'wagmi'
import { verifyMessage } from 'ethers/lib/utils'
import {Button} from 'antd'
export default function SignTypedData({parentCallback, domain, types, value}){
    const recoveredAddress = useRef()
    const { isError, isLoading, isSuccess,signTypedData } = useSignTypedData({
        domain,
        types,
        value,
        onSuccess(data, variables) {
          // Verify signature when sign message succeeds
          parentCallback(data)
        },
      })
    return(
        <div className='d-flex justify-content-center'>
            <div className='text-center'>
            <Button 
            loading={isLoading}            
             onClick={(e) => {
                e.preventDefault()
                signTypedData()
            }}>Upload Post</Button>
            </div>
        </div>
    )
}

