import React,{useState, useEffect} from 'react'
import {Anchor, Typography, message, Row, Col, Input, Button, Modal, Collapse,Alert, Switch, List} from 'antd'
import ImageNft from '../profile/ImageNft'
import GenerateImage from './GenerateImage'
import { useDispatch, useSelector } from "react-redux";
import ArtistSelector from './ArtistSelector'
import SelasSDKImageGenerator from './SelasSDKImageGenerator';
const {TextArea} = Input



export default function PrompCrafter(props){
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


    const createImage = async (response) => {
        if(response){
            setImage(response)

        }else{
            message.error("Something failed during the image generation, please tryit again")

        }
      }



    useEffect(() => {
        if(image){
            setShowImage(true)
        }
    },[image])

    

    return(
    <div>
        <Modal visible={showImage} footer={null} width={1000} onCancel={() => {
            setShowImage(false)
            setImage(null)
            }}>
            <ImageNft data={image} showButtons={true}/>    
        </Modal>
            <div id="initialPrompt" className=" my-5">
            <div className='mt-5'>
            <h1>MAIRA</h1>
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
                            <div className="mt-3">
                            <a href="https://www.youtube.com/watch?v=ZjtOlVfojVE" target="_blank" className="">Check our Prompt tutorial!</a>
                            </div>
                        </div>
                            <TextArea placeholder='A cute cat...' rows={4} className="mt-3" onChange={(e) => {e.preventDefault();setInitialPrompt(e.target.value)}}></TextArea>
                        <div className="mt-3 ">
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

