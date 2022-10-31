import React,{useEffect, useState} from 'react'
import {Modal, Button, Col, Row,Image, message} from 'antd'
import {LoadingOutlined, ArrowLeftOutlined,ArrowRightOutlined, StarOutlined} from '@ant-design/icons'
import { selectUserState, setUserState } from "../../context/reducer";
import {BiLinkExternal} from 'react-icons/bi'
import { useDispatch, useSelector } from "react-redux";
import {useSession } from "next-auth/react"
import CreatePublication from '../../lens/CreatePublication';
import axios from 'axios'
export default function ImageModal({data, showButtons=true}){
    const dispatch = useDispatch();        
    const [image, setImage] = useState(null)
    const { data: session, status } = useSession()
    const [loading, setLoading] = useState(false)
    const [postId, setPostId] = useState(null)
    
    const updateLikeStatus = async (e) => {
        e.preventDefault()
        const _image = {...data, liked:!data.liked}
        setImage(_image)
        const response = await axios.post("/api/addToFavourite", {image:_image}).catch((err) => {
            console.trace(err)
            message.error("Oops something failed...")
            setImage(data)
        })
        if(response?.data?.data){
            dispatch(setUserState({user:response?.data?.data}))
            message.success("Image added to favorites");

          }
    }
    const mintNft = async (e) => {
        e.preventDefault();
        setLoading(true)
        let _image = {...image} 
        _image.prompt = "AI generated image using the @selas.lens text2Image engine. Learn more at https://thegallerydao.io. \n" + 
        "Prompt: "  + image.prompt + ".\n During beta all collect fees on Lens will go to The Gallery DAO treasury.\n\n"
         if(session.handle)
            _image.prompt += " Created by @" +  session.handle + " \n"
        const response = await axios.post("/api/createPost", {image:_image}, {timeout: 50000}).catch((err) => {
            console.log(err);
            message.error("Oopss, somenthing failed during the Lens post publication... please contact support.")
        })
        if(response && response.status == 200){
            message.success("Congratulations!!, you have minted a post on Lens!!");
            if(response?.data?.data){
                dispatch(setUserState({user:response?.data?.data}))
              }
        }
        setLoading(false)        
    }
    useEffect(() => {
        setImage(data)
        return(
            setImage(null)
        )
    },[])
    useEffect(() => {
        setImage(data)
    },[data])


    return(
        image?(
            <div>
                {
                   image?(
                        <Row justify="space-around" align="middle" gutter={[16,16]}>
                        <Col lg={16} md={20}>
                            <img src={image.img_url} alt="" className="img-fluid p-3"/>
                        </Col>
                        <Col lg={8} md={20}>

                            <div className="">
                                <p>
                                    <b>Prompt:</b> <br/>
                                    {image.prompt}
                                </p>
                            </div>
                            {showButtons?(
                                <div className="mt-3">
                                <Row justify="" align="middle" gutter={[16,16]}>
                                    <Col>
                                    {postId && (
                                        <Button 
                                            target={"_blank"}
                                            href={'https://lenster.xyz/posts/'+ postId}  
                                            type="primary"
                                        >
                                            Check on Lenster 
                                            <BiLinkExternal/>
                                        </Button>
                                    )}
                                        
                                    </Col>
                                    <Col>
                                       {session.handle && (
                                        <CreatePublication parentCallback={(postId) => setPostId(postId)}  image={image}/>
                                       ) }
                                    </Col>
                                </Row>
                            </div>
                            ):null}

                        </Col>
                    </Row>
                    ):(
                        <LoadingOutlined  spin/>
                    )
                }
            </div>
        ):null
    )
}
