import React,{useState, useEffect} from 'react'
import {Anchor, Typography, message, Row, Col, Input, Button, Modal, Collapse,Alert, Switch, List} from 'antd'
import ImageNft from '../profile/ImageNft'
import GenerateImage from './GenerateImage'
import { selectUserState, setUserState } from "../../context/reducer";
import { useDispatch, useSelector } from "react-redux";
import ArtistSelector from './ArtistSelector'
import SelasSDKImageGenerator from './SelasSDKImageGenerator';
const {TextArea} = Input



export default function PrompCrafter(props){
    const userState = useSelector(selectUserState);
    const dispatch = useDispatch();        
    const [data, setData] = useState({
        Proximity:null,
        Position:null,
        Lighting:null,
        FilmType:null,
        ArtHistoryReference:null,
    })
    const [prompt, setPrompt] = useState(null)
    const [preset, setPreset] = useState(null)
    const [loading, setLoading] = useState(false)
    const [showModifiers, setShowModifiers] = useState(false)
    const [showImage, setShowImage] = useState(false)
    const [image, setImage] = useState(null)
    const [initialPrompt, setInitialPrompt] = useState("")

    const updateData = (key, val) => {
        let result = {...data}
        result[key] = val
        setData(result)
    }

    const createPrompt = () => {
        let result = initialPrompt?initialPrompt + ", ":""
        Object.keys(data).forEach((key) => {
            result += data[key]?data[key] + ",":""
        })
        if(result.length > 0){
            setPrompt(result.slice(0,-1))
        }else{
            setPrompt(null)
        }
    }

    const createImage = async (response) => {
        if(response){
            setImage(response.image)

        }else{
            message.error("Something failed during the image generation, please tryit again")

        }
      }

    useEffect(() => {
        createPrompt()
    },[initialPrompt])

    useEffect(() => {
        if(image){
            setShowImage(true)
        }
    },[image])

    

    return(
    <div>
        <Modal visible={showImage} footer={null} width={1000} onCancel={() => setShowImage(false)}>
            <ImageNft data={image} showButtons={true}/>    
        </Modal>
            <div id="initialPrompt" className=" my-5">
            <div className="mt-5">
                <Row>
                    <Col className='orangeBg p-3 rounded'>
                    <h3 className='text-white'>Halloween Competition</h3>
                    <p className="m-0 text-white">
                    Create a Halloween themed work between now and Oct 31st  (12am EST) and you could win⚡️ <br />

                    70 Matic - best prompt + image <br />
                    30 Matic - most collected image  <br />

                    Top 4 creators receive 200 #lensAI credits. Make sure to tag #allthingsghost <br />
                    </p>
                    </Col>
                </Row>
            </div>
            <div className='mt-5'>

            <Row gutter={[16,16]} justify="space-between" align="top">
                <Col sm={24} md={24} lg={12}>
                    <div className="my-3">
                        <Row gutter={[16,16]} align="middle">
                            <Col>
                                <Button type="primary" shape="circle" size="small">1</Button>
                            </Col>
                            <Col className='d-flex align-items-center'>
                                <p className='text-lg m-0'>Select your theme</p>
                            </Col>
                        </Row>
                    </div>
                    <ArtistSelector parentCallback={(val) => setPreset(val)}/>
                </Col>
                <Col sm={24} md={24} lg={12}>
                <div className="my-3">
                        <Row gutter={[16,16]} align="middle">
                            <Col>
                                <Button type="primary" shape="circle" size="small">2</Button>
                            </Col>
                            <Col className='d-flex align-items-center'>
                                <p className='text-lg m-0'>Enter your prompt to remix the inspiration image in your own style</p>
                            </Col>
                        </Row>
                    </div>
                    <div className="">
                        {userState && <h6 className="mt-3">You have {userState.user.avaibleGenerations} generations left</h6>}
                            <div className="mt-3">
                            <a href="https://www.youtube.com/watch?v=ZjtOlVfojVE" target="_blank" className="">Check our Prompt tutorial!</a>
                            </div>
                        </div>
                            <TextArea placeholder='A cute cat...' rows={4} className="mt-3" onChange={(e) => {e.preventDefault();setInitialPrompt(e.target.value)}}></TextArea>
                        <div className="mt-3 ">
                            <Alert type="warning" showIcon message="During October all posts are gasless and mint as a free collect"></Alert>
                            <div className="my-3">  
                                  
                                    <SelasSDKImageGenerator 
                                        prompt={initialPrompt}
                                        preset={preset}
                                        parentCallback={(res) => createImage(res)}
                                    />    
                            </div>
                        </div>  
                </Col>

            </Row>
            </div>  
            </div>

      
    </div>        
    )
}

