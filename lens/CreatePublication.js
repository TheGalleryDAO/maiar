import React, { useState, useEffect } from 'react';
import { utils } from 'ethers';
import { signIn, signOut, useSession } from "next-auth/react"

import {createPostTypedData} from '../utils/lens/social/create-post-typed-data'
import {createDispatcherPost} from '../utils/lens/social/createDispatcherPost'

import {isValidToken} from './index'
import { pollUntilIndexed } from '../utils/lens/social/hasTransactionBeenIndexed';
import {getPublication} from '../utils/lens/social/getPublication';
import { calcGas } from '../utils/lens/ethers.service';
import { lensHub } from '../utils/lens/social/lens-hub';
import axios from 'axios'
import {useSigner, useAccount, useSignMessage } from 'wagmi';
import SignTypedData from '../components/Social/SignTypedData'
import omitDeep from 'omit-deep';
import {Modal, Row, Col, Button, message,Input} from 'antd'
import ConnectWallet from '../components/ConnectWallet';
import Login from '../components/Social/Login';

const { TextArea } = Input;



export default function CreatePublication({image, parentCallback}){


  const defaultComment = `
It's Spooky Szn 👻 #allthingsghost. 

Prompt: 
${image?.prompt}.

During October all posts are gasless and mint as a free collect

@thegallerydao.lens @selas.lens @lensprotocol

Check out bit.ly/lensai
  `
  const { data: signer } = useSigner()
  const { data: session, status } = useSession()

  const { isConnected } = useAccount()
  const [isLogedIn, setisLogedIn] = useState(false)
  const [hasDispatcher, setHasDispatcher] = useState(false)
  const [txHash, setTxHash] = useState(false)
  const [posted, setPosted] = useState(null)
  const [isLoading, setisLoading] = useState(false)
  const [comment, setComment] = useState(defaultComment)
  const [errorPosting, setErrorPosting] = useState(null)
  const [signature, setSignature] = useState(null)
  const [typedData,setTypedData] = useState(null)
  const [visible,setVisible] = useState(null)
  const LensHub = lensHub(signer) 


  const createTypedData = async () => {
    try{
      setisLoading(true)
      const response = await axios.post("/api/uploadToIPFS", {image:image, comment:comment})
      
      const ipfsHash = response?.data?.data
      if(ipfsHash){
        const postRequest = {
          profileId: session.profileId,
          contentURI: `ipfs://${ipfsHash}`,
          collectModule: {
            "freeCollectModule":  {
              "followerOnly": false
           }
          },
          referenceModule: {
              followerOnlyReferenceModule: false
          }
        };
        const postTypedData = await createPostTypedData(postRequest)
        const _typedData = postTypedData.data.createPostTypedData.typedData;
        console.log(_typedData)
        setTypedData(_typedData)
        const signature = await signer._signTypedData(
            omitDeep(_typedData.domain, '__typename'),
            omitDeep(_typedData.types, '__typename'),
            omitDeep(_typedData.value, '__typename')
        )

        setSignature(signature)
      }else{
        message.error("Please refresh the page and try it again.")
      }
      setisLoading(false)
    }catch(err){
      parentCallback(null)
      console.log(err)
      setisLoading(false)
      message.error("Please refresh the page and try it again.")
      onCancel()
    }}
  const mintDispatcher = async () => {
    try{
      setisLoading(true)
      const response = await axios.post("/api/uploadToIPFS", {image:image, comment:comment})
      
      const ipfsHash = response?.data?.data
      if(ipfsHash){
        console.log(ipfsHash)
        const dispatcherPost = await createDispatcherPost(session.profileId, ipfsHash)
        console.log(dispatcherPost)
        if(dispatcherPost.txHash){
          setTxHash(dispatcherPost.txHash)
          const indexedResult = await pollUntilIndexed(dispatcherPost.txHash).catch((err) => {
            console.trace(err)
          });
          console.log(indexedResult)
          setErrorPosting(!indexedResult || indexedResult?.indexed === false)
          setPosted(indexedResult?.indexed)
          setisLoading(false)
        }else{
          setErrorPosting(true)
          setPosted(false)
          setisLoading(false)
        }
      }else{
        message.error("Please refresh the page and try it again.")
      }
      setisLoading(false)
    }catch(err){
      parentCallback(null)
      console.log(err)
      setisLoading(false)
      message.error("Please refresh the page and try it again.")
      onCancel()
    }}
  const mint = async  () => {
    try{
      setisLoading(true)
      const { v, r, s } = utils.splitSignature(signature);
      const txData = {
        profileId: typedData.value.profileId,
        contentURI:typedData.value.contentURI,
        collectModule: typedData.value.collectModule,
        collectModuleInitData: typedData.value.collectModuleInitData,
        referenceModule: typedData.value.referenceModule,
        referenceModuleInitData: typedData.value.referenceModuleInitData,
        sig: {
          v,
          r,
          s,
          deadline: typedData.value.deadline,
        },
      }
      const estimatedGasfee = await LensHub.estimateGas.postWithSig(txData).catch((err) => {
        console.trace(err);
      })

      const gasFee = await calcGas(estimatedGasfee).catch((err) => {
        console.trace(err)
      });         
      const tx = await LensHub.postWithSig(txData, gasFee).catch((err) => {
        console.trace(err)
      });dispatcherPost
      setTxHash(tx.hash)
      if(tx.hash){
        console.log("TX HASH: " + tx.hash);
        const indexedResult = await pollUntilIndexed(tx.hash).catch((err) => {
          console.trace(err)
        });
        console.log(indexedResult)
        setErrorPosting(!indexedResult || indexedResult?.indexed === false)
        setPosted(indexedResult?.indexed)
        setisLoading(false)
      }else{
        throw new Error("Tx failed!")
      }

    }catch(err){
      parentCallback(null)
      console.log(err)
      setisLoading(false)
      message.error("Please refresh the page and try it again.")
      onCancel()
    }
  }



  const onCancel = () => {
    setTypedData(null)
    setVisible(false)
    setComment("")
    setPosted(false)
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

  const onChange = (e) => {
  setComment(e.target.value);
  };
  const getPostId = async () => {
    try{
      const postId = await getPublication(txHash);
      if(postId){
        parentCallback(postId)
      }
    }catch(err){
      console.log(err)
      parentCallback(null)
    }
  }

  useEffect(() => {
    if(posted === true){
      if(txHash){
        getPostId()
      }
      setVisible(false)
      

    }
  }, [posted])
  useEffect(() => {
    if(signature !== null){
      mint()
    }
  }, [signature])
  useEffect(() => {
    const lenstToken = localStorage.getItem("LensToken")
    setisLogedIn(lenstToken && lenstToken !== "")
  },[session])

  

  return(
    <div>
      <Modal width={1000} footer={null} onCancel={onCancel} visible={visible}>
        {
          isLogedIn?(
            <div className='py-5 px-3'>
              <div className="d-flex justify-content-center">
                <img src={image.img_url} alt="" className="img-fluid rounded" />
              </div>
              <Row className='mt-3' gutter={[16,16]} justify="center" align="middle">
                <Col md={22} lg={16}>
                  <b className='mb-3'>Say something!</b>
                <TextArea allowClear autoSize={{ minRows: 4, maxRows: 10 }} defaultValue={defaultComment}  onChange={onChange}/>
                <div className="d-flex justify-content-end">
                  {
                    session.canUseRelay ? (
                      <Button loading={isLoading} disabled={isLoading} className="greenButton mt-3" onClick={mintDispatcher}>Publish Gasless</Button>

                    ):(
                      <Button loading={isLoading} disabled={isLoading} className="greenButton mt-3" onClick={createTypedData}>Publish</Button>

                    )
                  }

                </div>
                </Col>
              </Row>
            </div>
          ):(
            <Login parentCallback={login}/> 
          )
        }
      </Modal>
      <Button className='greenButton' onClick={() => setVisible(true)}>Mint on Lens</Button>

    </div>
  )
}
