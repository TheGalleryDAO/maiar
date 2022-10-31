import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {Image,message, Button, Modal, Row, Col, Switch} from 'antd'
import {useSession } from "next-auth/react"



export default function AiImage({image}){
    const [loading, setLoading] = useState(false)
    const [_image, setImage] = useState(false)
    const [visible, setVisible] = useState(false)
    const [handle, setHandle] = useState(null)
    const [includeHandle, setIncludeHandle] = useState(true)
    const { data: session, status } = useSession()

    const onClick = async (e) => {
        e.preventDefault();
        setLoading(true)
        let data = {..._image} 
        data.prompt = "AI generated image using the @selas.lens text2Image engine. Learn more at https://thegallerydao.io. \n" + 
        "Prompt: "  +_image.prompt + ".\n During beta all collect fees on Lens will go to The Gallery DAO treasury.\n\n"
         if(handle && includeHandle)
            data.prompt += " Created by @" +  handle + "\n"
        const response = await axios.post("/api/createPost", {image:data}).catch((err) => {
            console.log(err);
            message.error("Oopss, somenthing failed during the Lens post publication... please contact support.")
        })
        if(response && response.status == 200){
            message.success("Congratulations!!, you have minted a post on Lens!!");
            setImage(response.data.image)
        }
        setLoading(false)
    }
    // const getHandle = async () => {
    //     const response = await axios.get("/api/getLensHandle").catch((err) => {
    //         console.log(err)
    //     });
    //     console.log(response)
    //     setHandle(response?.data?.handle)
    // }
    useEffect(() => {
        setImage(image)
        //getHandle()
    },[image])

    useEffect(() => {
        const _handle = session.handle;
        setHandle(_handle)
    },[])

    return(
        image?(
            <div>
            <Modal visible={visible} width={1000} footer={null} onCancel={()=> setVisible(false)}>
                <Row gutter={[16,16]} align="middle">
                    <Col lg={14} md={24}>
                        <img src={_image.img_url} alt={_image.prompt} className="img-fluid"/>
                    </Col>
                    <Col lg={10} md={24}>
                        <h3>Post it on Lens!</h3>
                        <p className="mt-3">
                        AI generated image using the @selas.lens text2Image engine. Learn more at https://thegallerydao.io. <br/><br/>
                        Prompt used: {_image.prompt}. <br/><br/>
                        {handle && includeHandle?" Created by @" +  handle:""}
                        </p>
                        {
                            handle?(
                                <div className="mt-3">
                                    <Row gutter={[16,16]}>
                                        <Col>
                                            <b>Include lens handle?</b>
                                        </Col>
                                        <Col>
                                            <Switch checked onChange={(val) => setIncludeHandle(val)}/>
                                        </Col>
                                    </Row>
                                </div>
                            ):null
                        }
                        <Button className="btn btn-success mt-3" loading={loading} onClick={(e) => onClick(e)}>Publish on Lens</Button>
                        
                    </Col>
                </Row>
            </Modal>
            <Image src={_image.img_url} alt={_image.prompt} className="img-fluid"/>
            {
                _image.nft_generated === false?(
                    <div className="text-start">
                        <Button loading={loading} size="small" className="mt-3" type="primary" onClick={() => setVisible(true)}>Mint on lens</Button>
                    </div>
                ):null
            }
        </div>
        ):null
    )
}
