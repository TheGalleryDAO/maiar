import React, {useEffect, useState}  from 'react'
import {Radio, Row, Col, Switch} from 'antd'
import Config from '../config'

export default function Position({parentCallback}){
    const [selected, setSelected] = useState(0) 
    const [enabled, setEnabled] = useState(false) 

    const config = Config.photographySettings.position; 
    
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
                                <h3>Position Settings</h3>

                                </Col>
                                <Col>
                                <Switch onChange={onEnable}/>

                                </Col>
                            </Row>
                        <div className="mt-3">
                        <Radio.Group onChange={onChange} defaultValue={0} disabled={!enabled}>
                            {
                                config.map((el, indx) => {
                                    return(
                                    <Radio.Button key={indx} value={indx}>{el.name}</Radio.Button>
                                    )
                                })
                            }
                        </Radio.Group>
                        </div>
                        </div>
                    </Col>
                </Row>

            </div>
        </div>
    )
}