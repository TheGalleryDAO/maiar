import { useRouter } from 'next/router'
import {useState,useEffect} from 'react'
import {Row, Col, Avatar, Button, Message, message} from 'antd'
import {getUserProfile} from '../../utils/lens/social/getUserProfile'
import {getUserPosts} from '../../utils/lens/social/getUserPosts'
import InfiniteScroll from 'react-infinite-scroll-component'
import Link from 'next/link'
import Layout from '../../components/general/Layout'
export default function User(props){
    const router = useRouter()
    const {handle} = router.query
    const [profile, setProfile] = useState(null)
    const [posts, setPosts] = useState(null)
    const [pageInfo, setPageInfo] = useState(null)
    const [profilePic, setProfilePic] = useState(null)
    const [error, setError] = useState(false)
    const init = async () => {
        try{
            const _profile = await getUserProfile(handle.toLowerCase()) 
            const _profilePic =  _profile?.picture?.original?.url.replace("ipfs://", "https://lens.infura-ipfs.io/ipfs/")
            setProfilePic(_profilePic)
            setProfile(_profile)
            console.log(_profile)
        }catch(err){
            console.log(err);
            setError(true)
            message.error("Oops something goes wrong!")
        }
    }

    const getInitPosts = async () => {
        const _posts = await getUserPosts(profile.id)
        console.log(posts)
        setPosts(_posts?.data?.publications?.items)
        setPageInfo(_posts?.data?.publications?.pageInfo)

    }
    const fetchData = async ( ) => {
        try{
            if(pageInfo){
                const next = JSON.parse(pageInfo.next)
                    console.log("Fetching...")
                    const response = await getUserPosts(profile.id, pageInfo.next)

                    const _posts = [...posts,...response.data.publications.items]
                    setPosts(_posts)
                    setPageInfo(response?.data?.publications?.pageInfo)

            }
        }catch(err){
            console.log(err)
        }
    }
    useEffect(() => {
        if(handle){
            init()
        }
    },[handle])
    useEffect(() => {
        if(profile){
            getInitPosts()
        }
    },[profile])
    return(
        <Layout fullScreen={true}>
            {
        profile?(
            <div>
                <div id="header" className='responsiveBg d-flex justify-content-center align-content-middle py-5'>
                    <div className='text-center'>
                        <Avatar size={128} src={profilePic || ""}/>
                        <p className="mt-3 text-lg">
                            @{handle}
                        </p>
                        <Row  justify="center" align="bottom" gutter={[32,32]} className="mt-3">
                            <Col>
                                <p className="text-center text-sm">
                                    {profile?.stats?.totalFollowers} <br />
                                    Followers
                                </p>
                            </Col>
                            <Col>
                            <p className="text-center text-sm">
                                    {profile?.stats?.totalFollowing} <br />
                                    Following
                                </p>
                            </Col>
                        </Row>    
                            
                    </div>
                </div>
                <div className="mt-5">

                {posts && (  <Row>

                    <InfiniteScroll
                    dataLength={pageInfo.totalCount} //This is important field to render the next data
                    next={fetchData}
                    hasMore={posts.length < pageInfo.totalCount}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                        </p>
                    }
                    >
                    <Row>
                        {
                        posts.map((img,idx) => {
                            const imageLink =   img?.metadata?.media[0]?.original?.url.replace("ipfs://", "https://lens.infura-ipfs.io/ipfs/")

                        return(
                            <Col key={idx} lg={4} md={6} xs={12}>
                                <Link href={"/post/" + img.id}>
                                <div className='img__wrap'>
                                    <img src={imageLink} alt="" className="img-fluid isButton" />
                                    <p className="img__description  m-0">
                                        @{handle}
                                    </p>
                                </div>
                                </Link>
                            </Col>
                            
                        )
                    })
                    }
                    </Row>
                    </InfiniteScroll>
                    </Row> 
                )}
                </div>
            </div>
        ):(
            <div>
            </div>
        )
            }
        </Layout>
    )
}