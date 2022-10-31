import {useState, useEffect} from 'react'
import axios from 'axios'
import {getFeed} from '../../utils/lens/social/getFeed'
import {Row, Col, Modal} from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import ModalPost from './ModalPost'

export function CommunityGallery(props){
    const [images, setImages] = useState(null)
    const [pageInfo, setPageInfo] = useState(null)
    const [error, setError] = useState(false)

    const init = async () => {
        try{
            const response = await getFeed()
            console.log(response.data.explorePublications)
            setImages(response.data.explorePublications.items)
            setPageInfo(response.data.explorePublications.pageInfo)
        }catch(err){
            setError(true)
            console.log(err)
        }
    }
    const fetchData = async ( ) => {
        try{
            if(pageInfo){
                const next = JSON.parse(pageInfo.next)
                if(next.offset + 24 <= pageInfo.totalCount){
                    console.log("Fetching...")
                    const response = await getFeed(pageInfo.next)
                    const _images = [...images,...response.data.explorePublications.items]
                    setImages(_images)
                    setPageInfo(response.data.explorePublications.pageInfo)
                }else {
                    console.log("End")
                }
            }
        }catch(err){
            console.log(err)
        }
    }
    const refreshFeed = ( ) => {
        console.log("refresh")
    }
    useEffect(() => {
        if(!images){
            init()
        }
    },[])
    return (
        <div className='mt-5 container-fluid'>
                  {images && (  <Row>

                    <InfiniteScroll
                    dataLength={images.length} //This is important field to render the next data
                    next={fetchData}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                        </p>
                    }
                    >
                    <Row gutter={[16,16]} justify="center">
                        {
                        images.map((img,idx) => {
                        return(
                            <Col key={"idx-" + idx} lg={6} md={6} xs={12}>
                                <ModalPost post={img}/>
                            </Col>
                            
                        )
                    })
                    }
                    </Row>
                    </InfiniteScroll>
                    </Row> )}

        </div> 

    )
}