import React,{ useState, useEffect, createRef} from 'react'
import {Row, Col, Carousel} from 'antd'
import  {LeftOutlined,RightOutlined} from '@ant-design/icons'


export default function PresetSelector({artist, parentCallback, isNull}){
    let carousel = createRef();
    const [selected, setSelected] = useState(null)

    const next =  () => {
        carousel.next()
    }
    const prev =  () => {
        carousel.prev()
    }
    const carouselProps = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6, //this.props.events.length > 7 ? 7:this.props.events.length,
        slidesToScroll: artist.presets.length %2 == 0?2:3
      };
      const selectPreset = (idx) => {
        setSelected(idx != selected?idx:null)

      }
      useEffect(() => {
        parentCallback(artist.presets[selected]?.prompt)
      },[selected])
      useEffect(() => {
        if(isNull){
            setSelected(null)
        }
      },[isNull])
    return(
        <div>
        <h5 >{artist.artist}</h5>
        <Row className='mt-3' align="middle" gutter={[16,16]}>
          {artist.presets.map((preset, idx) => {
                      return(
                        <Col xs={8}sm={8} md={6} lg={4} key={"key-" + idx}>
                          <div className={' presetCard isButton hoverEffect'} onClick={() => selectPreset(idx)} >
                            <figure className={(idx == selected ? "activePreset":"")}>
                                <img src={preset.image} alt="" />
                            </figure>
                          </div>
                        </Col>
                      )
                  })}
        </Row>
    </div>
    )
}