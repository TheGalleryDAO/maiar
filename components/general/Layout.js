import React from 'react'
import {Row, Col} from 'antd'
import Header from './Header'

export default function Layout(props){
    return(
        <div className="pb-5">
            <Header></Header>
        <Row justify="center">
            <Col span={props.fullScreen?24:22}>
                {props.children}
            </Col>
        </Row>
        </div>
    )
}