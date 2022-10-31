import React, {useState,useEffect} from 'react'

import 'antd/dist/antd.min.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'
import {wrapper}  from "../context/store";
import Layout from '../components/general/Layout'

// import "jquery/dist/jquery.min.js";
//import 'bootstrap/dist/js/bootstrap.min.js'
import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
} from 'wagmi'

import { SessionProvider } from "next-auth/react"
import { publicProvider } from 'wagmi/providers/public'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'


function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true })

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return children
}

function MyApp({ Component, pageProps }) {
  const [client, setClient] = useState(null)
  useEffect(() => {
    const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
     //alchemyProvider({ apiKey: 'yourAlchemyApiKey' }),
      publicProvider(),
    ])
    const _client  = createClient({
      autoConnect: false,
      connectors: [
        new MetaMaskConnector({ chains }),
        new CoinbaseWalletConnector({
          chains,
          options: {
            appName: 'wagmi',
          },
        }),
        new WalletConnectConnector({
          chains,
          options: {
            qrcode: true,
          },
        }),
        new InjectedConnector({
          chains,
          options: {
            name: 'Injected',
            shimDisconnect: true,
          },
        }),
      ],
      provider,
      webSocketProvider,
    })
  
    setClient(_client)
  }, [])  
  return (

  client && (
  <WagmiConfig client={client}>
    <SessionProvider session={pageProps.session} refetchInterval={0}>
        <Component {...pageProps} />
    </SessionProvider>
  </WagmiConfig>
  )
  )
}

export default wrapper.withRedux(MyApp)
