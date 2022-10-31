import React, {useEffect, useState}  from 'react'
import {Radio, Row, Col, Switch, Typography, Space} from 'antd'
import Config from '../config'

const {Text} = Typography


export default function SizeStructureShape({parentCallback}){
    const [selected, setSelected] = useState(0) 
    const [enabled, setEnabled] = useState(false) 

    const config = Config.sizeStructureShape; 
    
    const onChange = (e) => {
        const _selected = e.target.value
        setSelected(_selected) 
      };    
    
      const onEnable = (data) => {
          setEnabled(data)
      }

    useEffect(() => {
        if(enabled){
            const value = config[selected].value
            parentCallback(value)
        }
    },[selected])

    useEffect(() => {
        if(!enabled){
            parentCallback(null)
        }else{
            parentCallback(config[selected].value)
        }
    },[enabled])


    return(
        <div>
            <div className="container">
                <Row className="my-3">
                    <Col lg={24}>
                        <div className="shadow p-3 mb-5 bg-body rounded">
                            <Row justify="space-between">
                                <Col>
                                <h3>Size, Structure and Shape</h3>

                                </Col>
                                <Col>
                                <Switch onChange={onEnable}/>

                                </Col>
                            </Row>
                            {
                                enabled?(
                                    <div className="mt-3">
                                    <Radio.Group onChange={onChange} defaultValue={0} disabled={!enabled}>
                                        <Space direction="vertical">
                                        {
                                            config.map((el, indx) => {
                                                return(
                                                <Radio value={indx} key={indx}>{el.name}</Radio>
                                                )
                                            })
                                        }
                                        </Space>
                                    </Radio.Group>
                                    </div>                                    
                                ):null
                            }
                        </div>
                    </Col>
                </Row>

            </div>
        </div>
    )
}