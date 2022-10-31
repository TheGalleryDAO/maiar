import React,{useEffect, useRef} from 'react'
import { useSignMessage } from 'wagmi'
import { verifyMessage } from 'ethers/lib/utils'
import {Button} from 'antd'

export default function Sign({parentCallback, message}){
    const recoveredAddress = useRef()
    const { data, error, isLoading, signMessage } = useSignMessage({
        onSuccess(data, variables) {
          // Verify signature when sign message succeeds
          const address = verifyMessage(variables.message, data)
          recoveredAddress.current = address
          parentCallback(address, data)
        },
      })


    return(
        <div className='d-flex justify-content-center'>
            <div className='text-center'>
            <Button type='primary' size="large" onClick={(e) => {
                e.preventDefault()
                console.log(message)
                signMessage({message})
            }}>Sign message</Button>
            <p className='mt-3'>
                Sign a message with your wallet to verify that you are the owner
            </p>
            </div>
        </div>
    )
}