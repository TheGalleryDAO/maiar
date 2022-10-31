import React, { useEffect } from 'react'

import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
    chain
  } from 'wagmi'
  
  export default function ConnectWallet() {
    const isMMsupported = typeof window.ethereum !== "undefined"
    const { address, connector, isConnected } = useAccount()
    const { data: ensAvatar } = useEnsAvatar({ addressOrName: address })
    const { data: ensName } = useEnsName({ address })
    const { connect, connectors, error, isLoading, pendingConnector } =
      useConnect({chainId:chain.polygon.id})
    const { disconnect } = useDisconnect()
  
    if (isConnected) {
      return (
        <div>
          <div>{ensName ? `${ensName} (${address})` : address}</div>
          <div>Connected to {connector.name}</div>
          <button onClick={disconnect}>Disconnect</button>
        </div>
      )
    }

    return (
      <div>
        <h3>Connect your wallet</h3>
        <div className='mt-3'>
          {
            isMMsupported?(
              <div>
              <button
              className="btn btn-outline-dark w-100 mb-3"
              disabled={!connectors[0].ready}
              key={connectors[0].id}
              onClick={() => connect({ connector:connectors[0] })}
            >
              {connectors[0].name}
              {!connectors[0].ready && ' (unsupported)'}
              {isLoading &&
                connectors[0].id === pendingConnector?.id &&
                ' (connecting)'}
            </button>
            {error && <div>{error.message}</div>}
            </div> 
            ):(
              <a href="https://metamask.app.link/dapp/thegallerydao.vercel.app">
                <button className="btn btn-outline-dark w-100 mb-3">
                  Open on Metamask App
                </button>
              </a>
            )
          }

        </div>
      </div>
    )
  }