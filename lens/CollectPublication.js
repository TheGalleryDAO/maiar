import React, { useState, useEffect } from 'react';
import {useSession } from "next-auth/react"
import {createDispatcherMirror} from '../utils/lens/social/createDispatcherMirror'
import {BsCollection} from 'react-icons/bs'
import {isValidToken} from './index'
import { pollUntilIndexed } from '../utils/lens/social/hasTransactionBeenIndexed';
import { lensHub } from '../utils/lens/social/lens-hub';
import {useSigner, useAccount, useSignMessage } from 'wagmi';
import {Modal, Row, Col, Button, message,Input} from 'antd'
import ConnectWallet from '../components/ConnectWallet';
import Login from '../components/Social/Login';

export default function MirrorPublication({postId, parentCallback}){

  const { data: signer } = useSigner()
  const { data: session, status } = useSession()

  const { isConnected } = useAccount()
  const [isLogedIn, setisLogedIn] = useState(false)
  const [hasDispatcher, setHasDispatcher] = useState(false)
  const [txHash, setTxHash] = useState(false)
  const [indexed, setIndexed] = useState(null)
  const [isLoading, setisLoading] = useState(false)
  const [errorPosting, setErrorPosting] = useState(null)
  const [signature, setSignature] = useState(null)
  const [typedData,setTypedData] = useState(null)
  const [visible,setVisible] = useState(null)
  const LensHub = lensHub(signer) 



  const mirror = async () => {
    try{
      const isValid = await isValidToken()
      if(!isValid || !isConnected){
        setisLoading(true)
        const dispatcherMirror = await createDispatcherMirror(session.profileId, postId)
        console.log(dispatcherMirror)
        setisLoading(false)
        console.log(dispatcherMirror)
        if(dispatcherMirror?.txHash){
          setTxHash(dispatcherMirror.txHash)
          const indexedResult = await pollUntilIndexed(dispatcherMirror.txHash).catch((err) => {
            console.trace(err)
          });
          console.log(indexedResult)
          setErrorPosting(!indexedResult || indexedResult?.indexed === false)
          setIndexed(indexedResult?.indexed)
          setisLoading(false)
        }else{
          setErrorPosting(true)
          setIndexed(false)
          setisLoading(false)
        }
      setisLoading(false)
      }else{
        console.log("Not valid sesssion")
      }

    }catch(err){
      parentCallback(null)
      console.log(err)
      setisLoading(false)
      message.error("Please refresh the page and try it again.")
      onCancel()
    }}



  const onCancel = () => {
    setVisible(false)
    setisLogedIn(false)
    setIndexed(false)
    setErrorPosting(null)
    setisLoading(false)
    setSignature(null)
    parentCallback(null)
  }

  const login = (val) => {
    if(!val){
      message.error("Please refresh the page and try it again.")
    }
    setisLogedIn(val)
  }



  

  return(
    <div>
      {/* <HiOutlineArrowsRightLeft /> */}
      <Button size='small' type='link' onClick={() => mirror()} loading={isLoading} icon={<BsCollection/>}></Button>
    </div>
  )
}
