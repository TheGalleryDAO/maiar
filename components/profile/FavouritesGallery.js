import React,{useState, useEffect} from 'react'
import {LoadingOutlined, ArrowLeftOutlined,ArrowRightOutlined, StarOutlined} from '@ant-design/icons'
import {Row, Col, Modal, Image, Button, message} from 'antd'
import axios from 'axios'
import { selectUserState, setUserState } from "../../context/reducer";
import { useDispatch, useSelector } from "react-redux";

export default function FavouritesGallery(props){
    const userState = useSelector(selectUserState);
    const dispatch = useDispatch();    
    const [selected, setSelected] = useState(null)
    const [selectedData, setSelectedData] = useState(null)
    const [visible, setVisible] = useState(false)
    
    const openModal= (e, data) => {
        e.preventDefault();
        setSelected(data);
        setVisible(true)

    }

   
    const onCancel = (e) => {
        e.preventDefault();
        setVisible(false);
        setSelected(null)
    }

    const moveRight = (e) => {
        e.preventDefault()
        if(selected < userState.user.favouriteImages.length - 1) setSelected(selected + 1)
    }
    const moveLeft =  (e) => {
        e.preventDefault()
        if(selected > 0) setSelected(selected - 1)
    }
    const updateLikeStatus = async (e) => {
        e.preventDefault()
        const _image = {...userState.user.favouriteImages[selected], liked:!userState.user.favouriteImages[selected].liked}
        setSelectedData(_image)
        const response = await axios.post("/api/addToFavourite", {image:_image}).catch((err) => {
            console.trace(err)
            message.error("Oops something failed...")
            setSelected(userState.user.favouriteImages[selected])
        })
        if(response?.data?.data){
            dispatch(setUserState({user:response?.data?.data}))
          }
    }

    useEffect(() => {
        if(selected < 0 && selected >= userState.user.favouriteImages.length)
            setSelected(0)
    },[userState.user.favouriteImages]) 
    useEffect(() => {
        if(selected >= 0 && selected < userState.user.favouriteImages.length)
            setSelectedData(userState.user.favouriteImages[selected])
    },[selected])  
    return(
        <div className="container">
            <Modal width="1000px" visible={visible} onCancel={onCancel} footer={null}>
                {
                    selected !== null && selectedData?(
                        <Row gutter={[16,16]} align="middle" justify="space-between">
                            <Col span={2}>
                                {
                                    selected ? (
                                        <Button onClick={e => moveLeft(e)} type="link" icon={<ArrowLeftOutlined/>}/>
                                    ):null
                                }
                            </Col>
                            <Col span={20} className="p-3">
                                <Row justify="space-around" align="middle" gutter={[16,16]}>
                                    <Col lg={16} md={20}>
                                        <Image src={selectedData.img_url} alt="" className="img-fluid p-3"/>
                                    </Col>
                                    <Col lg={8} md={20}>

                                        <div className="">
                                            <p>
                                                <b>Prompt:</b> <br/>
                                                {selectedData.prompt}
                                            </p>
                                        </div>
                                        <div className="mt-3">
                                            <Row justify="" gutter={[16,16]}>
                                                <Col>
                                                    <Button 
                                                    onClick={(e) => updateLikeStatus(e)} 
                                                    className={(selectedData.liked?" likedButton":"notLikedButton")}
                                                    >
                                                        <StarOutlined style={{fontSize:"20px"}}/> 
                                                    </Button>
                                                </Col>
                                                <Col>
                                                
                                                    {
                                                        selectedData.nft_generated ? null:(
                                                            <button className="btn btn-success text-white">Mint on Lens</button>                                                            
                                                        )
                                                    }
                                                </Col>
                                            </Row>
                                        </div>

                                    </Col>
                                </Row>
                            </Col>
                            <Col span={2}>
                            {
                                    selected < userState.user.favouriteImages.length - 1 ? (
                                        <Button onClick={(e) => moveRight(e)} type="link" icon={<ArrowRightOutlined/>}/>
                                        ):null
                                }
                            </Col>
                        </Row>
                    ):(
                        <LoadingOutlined  spin/>
                    )
                }
            </Modal>
            <Row gutter={[16,16]} >
                {
                    userState.user.favouriteImages?(userState.user.favouriteImages.map((el, idx) => (
                        <Col md={12} lg={6} key={"image-" + idx}>
                            <img onClick={(e) => openModal(e,idx)} src={el.img_url} alt="" className="img-fluid isButton"/>
                        </Col>
                    ))):null
                }
            </Row>
        </div>
    )
}


/**
 *         <div className="container">
            {
                images?(
                    <Carousel useKeyboardArrows={true} renderThumbs={customRenderThumb}  showIndicators={false} dynamicHeight showArrows={true} onChange={(data) => console.log("OnChange:", data)} onClickItem={(data) => console.log("OnClickItem:", data)} onClickThumb={(data) => console.log("OnClickThumb:", data)}>
                        {
                        images.map((el) => {
                            return(
                                <Row gutter={[32,32]} align="middle" className="p-3">
                                    <Col lg={16} md={24}>
                                        <img src={el.img_url} alt="" className="img-fluid"/>
                                    </Col>
                                    <Col lg={8} md={24}>
                                        <p className="text-start">
                                            <b>
                                                Prompt:
                                            </b> <br/>
                                            {
                                                " " + el.prompt
                                            }
                                        </p>
                                    </Col>
                                </Row>
                            )
                        })
                        }
                    </Carousel>

                ):(
                    <LoadingOutlined spin style={{fontSize:"30px"}}/>
                )
            }
        </div>
 */