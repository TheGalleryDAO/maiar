import React,{ useEffect, useState } from 'react'
import {Row, Col, Tabs, Button} from 'antd'
import PresetSelector from './PresetSelector'
import artists from '../general/presets'

const {TabPane} = Tabs
export default function ArtistSelector({parentCallback}){
    const [preset, setPreset] = useState(null)
    const [artist, setArtist] = useState(null)
    const [currentTab, setCurrentTab] = useState("tab-0")
    const onChangeTab = (key) => {
        setCurrentTab(key)
    }

    useEffect(() => {
        parentCallback(preset)
    },[preset])
    useEffect(() => {
        if(artist === null){
            parentCallback(null)

        }
    },[artist])

    return(
        <div>

            {
                artist !== null && artists[artist]? (
                    <div className=''>
                    <Button onClick={() => setArtist(null)}>Back</Button>  
                    <div className="mt-3">
                        <p className='text-lg'><b>Select your inspiration image</b></p>
                    </div>
                    <PresetSelector  isNull={artist === null} artist={artists[artist] || null} childCallbackX parentCallback={data => setPreset(data)}/>
                    </div>
                ):(
                    <div>
                    <p className='text-sm'>
                        *click an image to see more inspiration
                    </p>                        
                    <Row gutter={[16,16]}>
                        {
                        artists.map((artist, idx) => (
                            <Col xs={12} sm={12} md={6} lg={6} key={"key-" + idx}>
                            <div className='mx-auto presetCard isButton hoverEffect' onClick={() => setArtist(idx)} >
                              <figure className={(idx == artist ? "activePreset":"")}>
                                  <img src={artist.presets[0].image} alt="" />
                              </figure>
                              <p className="mt-3 text-center">
                                {
                                    artist.artist
                                }
                              </p>
                            </div>
                          </Col>
                            ))                            
                        }
                    </Row>
                    </div>
                )
            }
        {/*         <Tabs  tabPosition="left" onChange={onChangeTab}>
            {
                artists.map((artist, idx) => (
                    <TabPane  tab={artist.artist} key={"tab-" + idx}>
                        <PresetSelector key={"preset-" + idx} isNull={currentTab !== "tab-" + idx} artist={artist} childCallbackX parentCallback={data => setPreset(data)}/>
                    </TabPane>
                ))
            }
        </Tabs>  */}
        </div> 
    )
}