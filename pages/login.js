import React from 'react'
import { useAccount} from 'wagmi'
import ConnectWallet from '../components/ConnectWallet'
import Header from '../components/general/Header'
import LoginButton from '../components/LogInButton'
import Layout from '../components/general/Layout'
import { ConnectNetwork } from '../components/general/ConnectNetwork'


export default function Login() {
  const { isConnected } = useAccount()
  return (
    <Layout>
      <div className="fullScreen d-flex align-items-center justify-content-center ">
        {/* <ConnectNetwork/> */}
      {    
        isConnected ? (
          <LoginButton
          onSuccess={(data) => null}
          onError={(data) => null}
        />  
        ):(
          <div>
          <div className='my-5'>
            <h2>Welcome to LensAI</h2>
            <p className="mt-3">
                <b>LensAI</b> is a text2Image NFT generator, you can monetize your beautiful AI creations! 
                </p>
          </div>
          <ConnectWallet></ConnectWallet>

          </div>
        )
      }
      </div>

    </Layout>
  )

}