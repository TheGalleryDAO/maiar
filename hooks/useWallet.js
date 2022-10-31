import {useState} from 'react'
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { NetworkType } from "@airgap/beacon-sdk";

export default function useWallet(){
    cosnt [address,setAddress] = useState(null)
    const Tezos = new TezosToolkit(NetworkType.GHOSTNET);
    const wallet = new BeaconWallet({ name: "MAIRA" }); // Takes the same arguments as the DAppClient constructor
    
    Tezos.setWalletProvider(wallet);
    
    async function getActiveAccount(){
    // This code should be called every time the page is loaded or refreshed to see if the user has already connected to a wallet.
    const activeAccount = await wallet.client.getActiveAccount();
    if (activeAccount) {
      // If defined, the user is connected to a wallet.
      // You can now do an operation request, sign request, or send another permission request to switch wallet
      setAddress(activeAccount.address);
    } else {
      await wallet.requestPermissions();
      const _address = await wallet.getPKH();
      setAddress(_address)
    }
    }

    
    
    console.log("Operation Hash: ", hash);
    return {Tezos, wallet, getActiveAccount }
}

