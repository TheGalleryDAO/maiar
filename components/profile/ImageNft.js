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
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [postId, setPostId] = useState(null)
    
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
