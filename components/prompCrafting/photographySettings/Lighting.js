import React, {useEffect, useState}  from 'react'
import {Radio, Row, Col, Switch, Typography} from 'antd'
import {BsFillSunFill, BsFillHouseDoorFill} from 'react-icons/bs'
import Config from '../config'

const {Text, Title} = Typography


export default function Lighting({parentCallback}){
    const [selectedIndor, setSelectedIndor] = useState(0) 
    const [selectedOutdor, setSelectedOutdor] = useState(0) 
    const [indor, setIndor] = useState(true)
    const [enabled, setEnabled] = useState(false) 

    const configIndor = Config.photographySettings.indorLighting; 
    const configOutdor = Config.photographySettings.outdoorLighting; 
    
    const onChangeIndor = (e) => {
        const _selected = e.target.value
        setSelectedIndor(_selected) 
      };    

      const onChangeOutdor = (e) => {
        const _selected = e.target.value
        setSelectedOutdor(_selected) 
      }; 
      const onEnable = (data) => {
          setEnabled(data)
      }

      const changeLighting = (data) => {
            setIndor(data)
      }

    useEffect(() => {
        if(enabled && indor){
            const value = configIndor[selectedIndor].value
            parentCallback(value)
        }
    },[selectedIndor])

    useEffect(() => {
        if(enabled && !indor){
            const value = configOutdor[selectedOutdor].value
            parentCallback(value)
        }
    },[selectedOutdor])    

    useEffect(() => {
        if(!enabled){
            parentCallback(null)
        }else if(enabled && indor){
            parentCallback(configIndor[selectedIndor].value)
        }else {
            parentCallback(configOutdor[selectedOutdor].value)
        }
    },[enabled])

    useEffect(() => {
        if(!enabled){
            parentCallback(null)
        }else if(enabled && indor){
            parentCallback(configIndor[selectedIndor].value)
        }else {
            parentCallback(configOutdor[selectedOutdor].value)
        }
    },[indor])    


    return(
        <div>
            <div className="container">
                <Row className="my-3">
                    <Col lg={24}>
                        <div className="shadow p-3 mb-5 bg-body rounded">
                            <Row justify="space-between">
                                <Col>
                                <h3>Lighting Settings</h3>

                                </Col>
                                <Col>
                                <Switch onChange={onEnable}/>

                                </Col>
                            </Row>
                            {
                                enabled?(
                                    <div>
                        <Row className="mt-3" gutter={[16,16]}>
                            <Col>
                                <Text>
                                    Select the lighting: 
                                </Text>
                            </Col>
                            <Col>
                                <span className={indor || !enabled?"text-secondary":"" + " p-1"}><BsFillSunFill /> </span>
                            </Col>
                            <Col>
                            <Switch 
                                    onChange={changeLighting}
                                    defaultChecked
                                    disabled={!enabled}
                                />
                            </Col>
                            <Col>
                                <span className={indor && enabled?"":"text-secondary" + " p-1"}><BsFillHouseDoorFill /></span>
                            </Col>
                        </Row>
                        <div className="mt-5">
                        <Title level={5} type={indor && enabled?"":"secondary"}className="mb-3">Indoor lighting</Title>
                        <Radio.Group onChange={onChangeIndor} defaultValue={0} disabled={!enabled || !indor}>
                            {
                                configIndor.map((el, indx) => {
                                    return(
                                    <Radio.Button key={indx} value={indx}>{el.name}</Radio.Button>
                                    )
                                })
                            }
                        </Radio.Group>
                        </div>
                        <div className="mt-5">
                        <Title level={5} type={indor || !enabled?"secondary":""} className="mb-3">Outdoor lighting</Title>
                        <Radio.Group onChange={onChangeOutdor} defaultValue={0} disabled={!enabled || indor}>
                            {
                                configOutdor.map((el, indx) => {
                                    return(
                                    <Radio.Button key={indx} value={indx}>{el.name}</Radio.Button>
                                    )
                                })
                            }
                        </Radio.Group>
                        </div>                                         
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