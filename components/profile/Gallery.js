import React,{useState, useEffect} from 'react'
import {LoadingOutlined, ArrowLeftOutlined,ArrowRightOutlined} from '@ant-design/icons'
import {Row, Col, Modal, Button} from 'antd'
import ImageNft from './ImageNft'   
export default function Gallery({images, showButtons=true}){

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
        if(selected < images.length - 1) setSelected(selected + 1)
    }
    const moveLeft =  (e) => {
        e.preventDefault()
        if(selected > 0) setSelected(selected - 1)
    }

    useEffect(() => {
        if(selected < 0 && selected >= images.length)
            setSelected(0)
        else
            setSelectedData(images[selected])

    },[images]) 
    useEffect(() => {
        if(selected >= 0 && selected < images.length)
            setSelectedData(images[selected])
    },[selected]) 

    return(
        <div>
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
                            <Col span={20}>
                                <ImageNft data={selectedData} showButtons={showButtons}/>
                            </Col>

                            <Col span={2}>
                            {
                                    selected < images.length - 1 ? (
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
            <Row gutter={[16,16]} align="middle" >
                {
                    images?(images.map((el, idx) => (
                        <Col xs={12} sm={12} md={12} lg={6} key={"image-" + idx}>
                            <img onClick={(e) => openModal(e,idx)} src={el.img_url} alt="" className="img-fluid isButton"/>
                        </Col>
                    ))):null
                }
            </Row>
        </div>
    )
}
