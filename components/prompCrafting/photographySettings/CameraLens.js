import React, {useEffect, useState}  from 'react'
import {Radio, Row, Col, Switch, Typography, Space, Tabs} from 'antd'
import Config from '../config'

const {Text} = Typography
const {TabPane} = Tabs


export default function CameraLens({parentCallback}){
    const [selected, setSelected] = useState(0) 
    const [selectedTab, setSelectedTab] = useState(0) 
    const [enabled, setEnabled] = useState(false) 

    const config = Config.cameraLens; 
    const tabKeys = Object.keys(config)

    const onChange = (e, tab) => {
        const _selected = e.target.value
        setSelected(_selected) 
      };    
    const onChangeTab = (data) => {
        setSelectedTab(data)
        setSelected(0)
    }      
    
      const onEnable = (data) => {
          setEnabled(data)
      }

    useEffect(() => {
        if(enabled){
            const value = config[tabKeys[selectedTab]][selected].value
            parentCallback(value)
        }
    },[selected])

    useEffect(() => {
        if(!enabled){
            parentCallback(null)
        }else{
            parentCallback(config[tabKeys[selectedTab]][selected].value)
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
                                <h3>Camera lens options</h3>

                                </Col>
                                <Col>
                                <Switch onChange={onEnable}/>

                                </Col>
                            </Row>
                            {
                                enabled?(
                                    <Tabs defaultActiveKey={tabKeys[0]} onChange={onChangeTab}>
                                    {   
                                        tabKeys.map((key,tabIdx) => {
                                            return(
                                            <TabPane tab={key} key={tabIdx}>
                                                <Radio.Group onChange={(data) => onChange(data)} value={selected !== null?selected:0} defaultValue={0} disabled={!enabled}>
                                                    <Space direction="vertical">
                                                    {
                                                        config[key].map((el, elIdx) => {
                                                            return(
                                                            <Radio value={elIdx} key={`${tabIdx}-${elIdx}`}>{el.name}</Radio>
                                                            )
                                                        })
                                                    }
                                                    </Space>
                                                </Radio.Group>
                                            </TabPane>
                                            )
                                        })
                                        
                                    }
                                </Tabs>                            
                            
                                ):null
                            }
                        </div>
                    </Col>
                </Row>

            </div>
        </div>
    )
}