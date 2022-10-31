import React,{useState, useEffect, useCallback} from 'react'
import {Button, Col, message, Row, Typography} from 'antd'
import {LoadingOutlined} from '@ant-design/icons'
import {BsFillMoonStarsFill} from 'react-icons/bs'
import useWebSocket, { ReadyState } from 'react-use-websocket';
import axios from 'axios'
import {getRandomPrompt} from '../general/prompts'
import {ImMagicWand} from 'react-icons/im' 
const {Text} = Typography
//REQUEST STATUS pending, accepted, completed, error, cancelled

export default function GenerateImage({prompt, parentCallback, preset}){
    const [requestStatus, setRequestStatus] = useState(null)
    const [socketUrl, setSocketUrl] = useState('wss://selas.dev/dao');
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [messageHistory, setMessageHistory] = useState([]);
    const { sendMessage, lastMessage, readyState,  } = useWebSocket(socketUrl,{ shouldReconnect: (closeEvent) => true});
    const [jobId, setJobId] = useState(null)
    const [statusMessage, setStatusMessage] = useState(null)

    
    const createImageObject = async (job_id) => {
        try{
            let finalPrompt = preset?(preset.replace("%SUBJECT%", prompt)):prompt
            console.log(finalPrompt)
            const data  = {
                job_id,
                prompt:finalPrompt
            }
            const response = await axios.post("/api/generateImage", data)
            const _image = response?.data?.data;
            if(_image){
                setImage(_image)
                setJobId(jobId)
            }
        }catch(err){
            console.log(err)
            message.error("Oops something failed storing the image...")

        }
    }

    const setDefaults = () => {
        setImage(null)
        setJobId(null)
        setRequestStatus(null)
        setMessageHistory([])
        setLoading(false)
    }
  const saveImage = async (imageUrl) => {
    try{
        if(image){
            const _image = {...image, img_url:imageUrl}
            const response = await axios.post("/api/saveImage", {image:_image})
            if(response?.data?.data){
                parentCallback(response.data.data)
                setDefaults()
            }
        }
        setLoading(false)
    }catch(err){
        console.log(err)
        setLoading(false)
        message.error("Oops something failed storing the image...")
    }
  }
  const removeImage = async () => {
    try{
        const response = await axios.post("/api/removeImage", {jobId})
        if(response?.data?.data){
            parentCallback(null)
            setDefaults()
        }
        setLoading(false)
    }catch(err){
        console.log(err)
        setLoading(false)
        message.error("Oops something failed storing the image...")
    }
  }  
    const handleClickSendMessage = useCallback(async (_prompt, _preset) => {
        if(!loading){
            setLoading(true)
            const response = await axios.get("/api/generateSelasToken")
            console.log(response.data)
            console.log(_prompt)
            if(response?.data?.data  && _prompt !== null){
                let finalPrompt = _preset?(_preset.replace("%SUBJECT%", _prompt)):_prompt
                const data = {
                    prompt:finalPrompt.replace('"', "\\").replace("'", "\\"),
                    token:response.data.data
                }
                console.log("sent!")
                console.log(JSON.stringify(data))
                sendMessage(JSON.stringify(data))
            }     
        }
   
    }, []);
  
    const connectionStatus = {
      [ReadyState.CONNECTING]: 'Connecting',
      [ReadyState.OPEN]: 'Open',
      [ReadyState.CLOSING]: 'Closing',
      [ReadyState.CLOSED]: 'Closed',
      [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState]; 
    
    const createRandomImage = (e) => {
        e.preventDefault()
        const p = getRandomPrompt()
        console.log(p)
        handleClickSendMessage(p,preset)
    }

    useEffect(() => {
        console.log(lastMessage)
        if (lastMessage !== null && lastMessage?.data) {
          const _message = JSON.parse(lastMessage.data)
          if(_message?.jobId){
              createImageObject(_message.jobId)
          }else if(_message?.status){
              setRequestStatus(_message)
          }else{
              console.log(_message)
          }
          setMessageHistory((prev) => prev.concat(lastMessage));
        }
      }, [lastMessage, setMessageHistory]);
    
    useEffect(() => {
        if(requestStatus?.status == "completed" && requestStatus?.images !== null){
            saveImage(requestStatus.images[0])
            setStatusMessage({
                type:"success",
                message:"Your creation is ready!"
            })
        }else if(requestStatus?.status == "cancelled" || requestStatus?.status == "error"){
            setStatusMessage({
                type:"error",
                message:"Oops something failed during the image creation..."
            })
            removeImage()
        } else if(requestStatus?.status == "pending"){
            setStatusMessage({
                type:"warning",
                message:`You are the ${requestStatus?.queue} in the queue...`
            })
        }else if(requestStatus?.status == "accepted"){
            setStatusMessage({
                type:"success",
                message:"We are generating your image!"
            })
        }else{
            setStatusMessage({
                type:"warning",
                message:"Loading..."
            })
        }
    },[requestStatus])


    return(
        <div>
            {
                <Row gutter={[16,16]} align="middle">
                    {/* <Col>
                        <Button 
                        disabled = { connectionStatus != "Open" || loading} 
                        onClick={createRandomImage}>
                            <Row gutter={[8,8]}>
                                <Col>
                                <ImMagicWand/>
                                </Col>
                                <Col>
                                Surprise me                                
                                </Col>
                            </Row>
                        </Button>
                    </Col> */}
                    <Col>
                    <Button 
                    type="primary"
                    disabled={prompt === null || connectionStatus != "Open" || loading} 
                    onClick={() => handleClickSendMessage(prompt,preset)}
                    loading={loading}
                    >
                        <Row gutter={[8,8]}>
                            <Col><BsFillMoonStarsFill/></Col>
                            <Col>Generate</Col>
                        </Row>
                    </Button>
                    </Col>
                    <Col>
                    {
                        statusMessage && (
                            <Text type={statusMessage.type}>
                                {loading && <LoadingOutlined spin/>}
                                {statusMessage.message} <br />
                            </Text>
                        )
                        
                    }
                    {connectionStatus == "Connecting" && (
                        <Text type="warning">
                            Connecting with the server...
                        </Text>
                    )}
                    </Col>                    
                </Row>
            }

        </div>
    )
}
