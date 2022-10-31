import React,{useState, useEffect} from 'react'
import {authenticate} from '../../utils/lens/social/authenticate' 
import {verify} from '../../utils/lens/social/verifyToken' 
import {generateChallenge} from '../../utils/lens/social/generate-challenge.js'
import ConnectWallet from '../ConnectWallet'
import Sign from './Sign'
import { useAccount} from 'wagmi'
import {Modal, Row, Col, Steps, Button, Alert} from 'antd'
import { useDispatch, useSelector } from "react-redux";
import { signIn, signOut, useSession } from "next-auth/react"
import { selectUserState, setUserState } from "../../context/reducer";
import {sleep} from '../../utils/general'
import {Link} from'next/link'
const {Step} = Steps
export default function Login({parentCallback}){
    const userState = useSelector(selectUserState);
    const dispatch = useDispatch();

    const  {address,isConnected} = useAccount()
    const [verified, setVerified] = useState(false)
    const [current, setCurrent] = useState(0);
    const [challenge, setChallenge] = useState(0);

    const getChallenge = async () => {
        try{
            if(isConnected){
                const _challenge = await generateChallenge(address)
                setChallenge(_challenge.data.challenge.text)
            }
        }catch(err){
            console.log(err)
            setChallenge(null)
            parentCallback(false)
        }
    }
    const runLogin = async (_address, signature) =>  {
        try{
            const response = await authenticate(_address, signature);
            if(response?.data?.authenticate){
                dispatch(setUserState({...userState, lensToken:response.data.authenticate}))
                const stringToken = JSON.stringify(response.data.authenticate)
                await localStorage.setItem('LensToken',stringToken )
                const _verified = await verify()
                setVerified(_verified?.data?.verify)
                setCurrent(2)
                parentCallback(_verified?.data?.verify)

            }

        }catch(err){
            console.log(err)
            parentCallback(false)

        }
    }

    const stepsContent = [
        (
            <div className='d-flex justify-content-center align-items-center'>
                <Row className='container' justify='center'>
                    <Col xs={24} md={24} lg={8}>
                        <ConnectWallet/>
                    </Col>
                </Row>

            </div>
        ),
        (
            <div className='d-flex justify-content-center align-items-center'>
                <Sign parentCallback={runLogin} message={challenge}/>
            </div>
        ),
        (
            <div className='d-flex justify-content-center align-items-center'>
                {
                    !verified?(
                        <Alert type="error" showIcon message="Oops something failed in th verifying process..."/>

                    ):(
                        <Alert type="success" showIcon message="Login Successfully!!"/>

                    )
                }
            </div>
        )
    ]

    useEffect(() => {
        if(isConnected && challenge){
            setCurrent(1)

        }else if(!challenge){
            getChallenge()
        }
    },[isConnected, challenge])

    useEffect(() => {
        getChallenge()
    },[])
    useEffect(() => {
        console.log(userState)
    },[userState])

    return(

        <div>
            <div className='p-3'>
            <div className="mt-3">{stepsContent[current]}</div>
            </div>

        </div>     
    )
}
