import React,{useState, useEffect} from 'react'
import {Input, Button, Alert, Tabs, List, Typography} from 'antd'
import SignInButton from '../components/general/SignInButton'
import axios from 'axios'
import Layout from '../components/general/Layout'


const {TextArea} = Input
const {TabPane} = Tabs
const {Text} = Typography

export default function SecretDashboard(props){
    const [addresses, setAddresses] = useState([])
    const [handles, sethandles] = useState([])

    const [loading, setLoading] = useState(false)
    const [isAdmin, setIsAdmin] = useState(null)
    const [error, setError] = useState(null)
    const [whiteListErrors, setWhiteListErrors] =  useState(null) 


    const whiteListAddresses = async (e) => {
        e.preventDefault()
        setLoading(true)
        if(addresses.length > 0) {
            const response = await axios.post("/api/whiteListUsers", {addresses}).catch((err) => {
                setError("Error whitelisting users!")
                console.trace(err)
            })
            if(response?.data?.data){
                setWhiteListErrors(response.data.data)
            }
        }
        setLoading(false)
    }

    
    const verifyAdmin = async ({message, signature}) => {
        setLoading(true)
        try{
            const body = {message, signature}
            const response = await axios.post("/api/verifyAdmin", body)
            if(response?.data?.data){
                setIsAdmin(response?.data?.data)
            }
            setLoading(false)

        }catch(err){
            console.trace(err)
            setError("You are not Admin!")
            setLoading(false)

        }
        setLoading(false)
    }



    const collectAddresses = (e) => {
        e.preventDefault();
        const _addresses = e.target.value.trim().split(",")
        const _trimedAddresses = _addresses.map((el) => el.trim())
        setAddresses(_trimedAddresses)
    }



    const followUsers = async (e) => {
        e.preventDefault()
        setLoading(true)
        if(handles.length > 0) {
            const response = await axios.post("/api/follow", {handles},{timeout: 50000}).catch((err) => {
                setError("Error whitelisting users!")
                console.trace(err)
            })
            if(response?.data?.data){
                console.log(response.data.data)
            }
        }
        setLoading(false)
    }
    const collecthandles = (e) => {
        e.preventDefault();
        const _handles = e.target.value.trim().split(",")
        const _trimedhandles = _handles.map((el) => el.trim())
        sethandles(_trimedhandles)
    }    
    return(
        <div className="">
            {
                error?(
                    <Alert type="error" showIcon message={error}/>
                ):null
            }              
            {
            isAdmin ? (
                <Layout className="container">
                <Tabs defaultActiveKey="whitelist">
                    <TabPane tab="Whitelist Addresses" key="whitelist">
                        <TextArea placeholder="0x0000000,0x0000001,0x0000002,0x0000003" onChange={(e) => collectAddresses(e)}/>
                        <p className="mt-3">
                            Paste the wallet addresses, separated by commas, like: 0x0000000,0x0000001 Do not place whitespaces between adresses!!
                        </p>
                        <Button loading={loading} type="primary" className="mt-3" onClick={(e) => {whiteListAddresses(e)}}>Whitelist Users</Button>
                        {
                            whiteListErrors !== null && whiteListErrors.length > 0 ?(
                                <List
                                header="Copy the wallet addresses and try it again!"
                                itemLayout="vertical"
                                dataSource={whiteListErrors}
                                renderItem={(item) => (
                                  <List.Item>
                                    <Text copyable>{item}</Text>
                                  </List.Item>
                                )}
                              />
                            ):whiteListErrors !== null && whiteListErrors.length == 0?(
                                <Alert type="success" showIcon message="Users whitelisteds!!"/>
                            ):null
                        }
                    </TabPane>
                    <TabPane tab="Follow Users" key="followusers">
                    <TextArea placeholder="0x00,0x01,0x02,0x03" onChange={(e) => collecthandles(e)}/>
                        <p className="mt-3">
                            Paste the profileIds, separated by commas, like:0x00,0x01,0x02,0x03 Do not place whitespaces between adresses!!
                        </p>
                        <Button loading={loading} type="primary" className="mt-3" onClick={(e) => {followUsers(e)}}>Follow Users</Button>
                    </TabPane>
                </Tabs>
                </Layout>
            ):(
                <div className="fullScreen d-flex justify-content-center align-items-center">
                    <SignInButton loading={loading} error={error?true:false} parentCallback={verifyAdmin}/>

                </div>
            )                
            }          
        </div>

    )
}


//0x8f1b,0x94b3,0xa53c,0xaa43,0xad4c,0xb2e4,0xb49e,0xb91a,0xba4f,0xc38c
//"0x8f1b","0x94b3","0xa53c","0xaa43","0xad4c","0xb2e4","0xb49e","0xb91a","0xba4f","0xc38c"
